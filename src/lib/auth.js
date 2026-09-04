import { cookies } from "next/headers";

const SESSION_COOKIE = "portfolio_session";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Web Crypto (crypto.subtle) works in both the Edge middleware runtime
// and the Node.js server runtime.

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET is not configured");
  }
  return secret;
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(payload) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );
  return bytesToHex(new Uint8Array(signature));
}

export async function createSessionToken() {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `admin.${expiresAt}`;
  return `${payload}.${await sign(payload)}`;
}

export async function verifySessionToken(token) {
  if (!token) return false;

  const parts = typeof token === "string" ? token.split(".") : [];
  if (parts.length !== 3) return false;

  const [scope, expiresAt, signature] = parts;
  if (scope !== "admin") return false;

  const expires = Number(expiresAt);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;

  const expected = await sign(`${scope}.${expiresAt}`);
  if (expected.length !== signature.length) return false;

  // Constant-time comparison of the hex signatures.
  const a = hexToBytes(expected);
  const b = hexToBytes(signature);
  if (a.length !== b.length) return false;

  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

export async function isAuthenticated() {
  const cookieStore = cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

export { SESSION_COOKIE, SESSION_TTL_MS };
