import { Redis } from "@upstash/redis";
import { jsonResponse } from "@/lib/apiHelper";
import { createSessionToken, SESSION_COOKIE, SESSION_TTL_MS } from "@/lib/auth";

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000;
const attempts = new Map();

function getCredentials() {
  const email = process.env.ADMIN_EMAIL;
  const pass = process.env.ADMIN_PASSWORD;
  if (!email || !pass) {
    throw new Error("Admin credentials are not configured");
  }
  return { email, pass };
}

// Length-normalizing HMAC (Web Crypto, works in any runtime): both values are
// digested before comparison so timing/length never leaks the real credential.
async function hmacHex(value) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(process.env.AUTH_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const redis =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
    ? new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })
    : null;

const LOCKOUT_TTL_SECONDS = Math.ceil(LOCKOUT_MS / 1000);

async function isLockedOut(clientKey) {
  const key = `login:attempts:${clientKey}`;
  try {
    if (redis) {
      const count = await redis.get(key);
      return Number(count || 0) >= MAX_ATTEMPTS;
    }
  } catch {
    // Redis unavailable: fall back to in-memory below.
  }
  const record = attempts.get(clientKey);
  if (!record) return false;
  if (Date.now() - record.firstAttempt > LOCKOUT_MS) {
    attempts.delete(clientKey);
    return false;
  }
  return record.count >= MAX_ATTEMPTS;
}

async function recordFailure(clientKey) {
  const key = `login:attempts:${clientKey}`;
  try {
    if (redis) {
      const count = await redis.incr(key);
      if (count === 1) await redis.expire(key, LOCKOUT_TTL_SECONDS);
      return;
    }
  } catch {
    // Redis unavailable: fall back to in-memory below.
  }
  const record = attempts.get(clientKey);
  if (record && Date.now() - record.firstAttempt > LOCKOUT_MS) {
    attempts.set(clientKey, { count: 1, firstAttempt: Date.now() });
  } else if (record) {
    record.count += 1;
  } else {
    attempts.set(clientKey, { count: 1, firstAttempt: Date.now() });
  }
}

async function clearFailures(clientKey) {
  try {
    if (redis) {
      await redis.del(`login:attempts:${clientKey}`);
      return;
    }
  } catch {
    // Redis unavailable: fall back to in-memory below.
  }
  attempts.delete(clientKey);
}

async function constantTimeEqual(aHex, bHex) {
  if (aHex.length !== bHex.length) return false;
  const a = Uint8Array.from({ length: aHex.length / 2 }, (_, i) =>
    parseInt(aHex.slice(i * 2, i * 2 + 2), 16)
  );
  const b = Uint8Array.from({ length: bHex.length / 2 }, (_, i) =>
    parseInt(bHex.slice(i * 2, i * 2 + 2), 16)
  );
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function POST(req) {
  try {
    const clientKey =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const body = await req.json();
    const { email, password } = body ?? {};

    if (
      !email || typeof email !== "string" ||
      !password || typeof password !== "string"
    ) {
      return jsonResponse({ error: "Email and password are required" }, 400);
    }

    if (await isLockedOut(clientKey)) {
      return jsonResponse(
        { error: "Too many attempts. Try again in 15 minutes." },
        429
      );
    }

    let credentials;
    try {
      credentials = getCredentials();
    } catch {
      console.error("Login failed: admin credentials not configured.");
      return jsonResponse({ error: "Login is not configured" }, 500);
    }

    const [givenEmail, givenPass, realEmail, realPass] = await Promise.all([
      hmacHex(email.toLowerCase()),
      hmacHex(password),
      hmacHex(credentials.email.toLowerCase()),
      hmacHex(credentials.pass),
    ]);

    const emailOk = await constantTimeEqual(givenEmail, realEmail);
    const passOk = await constantTimeEqual(givenPass, realPass);

    if (!emailOk || !passOk) {
      await recordFailure(clientKey);
      return jsonResponse({ error: "Invalid email or password" }, 401);
    }

    await clearFailures(clientKey);

    const token = await createSessionToken();
    const response = jsonResponse({ success: true });
    response.headers.append(
      "Set-Cookie",
      `${SESSION_COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`
    );
    return response;
  } catch {
    return jsonResponse({ error: "Invalid request" }, 400);
  }
}
