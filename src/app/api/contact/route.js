import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { jsonResponse } from "@/lib/apiHelper";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const TO_EMAIL = "asadullahsadiqalvi@gmail.com";

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SENDS_PER_WINDOW = 3;
const BLOCK_TTL_SECONDS = Math.ceil(WINDOW_MS / 1000);

const redis =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
    ? new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })
    : null;

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function isRateLimited(clientKey) {
  const key = `ratelimit:contact:${clientKey}`;
  try {
    if (redis) {
      const count = await redis.incr(key);
      if (count === 1) await redis.expire(key, BLOCK_TTL_SECONDS);
      return count > MAX_SENDS_PER_WINDOW;
    }
  } catch {
    // If Redis is unavailable, fall through and allow the send.
  }
  return false;
}

export async function POST(req) {
  try {
    const clientKey =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (await isRateLimited(clientKey)) {
      return jsonResponse(
        { error: "Too many messages. Please try again later." },
        429
      );
    }

    const body = await req.json();
    const { name, email, subject, message } = body ?? {};

    if (!name || !email || !subject || !message) {
      return jsonResponse({ error: "All fields are required" }, 400);
    }

    if (
      typeof name !== "string" || typeof email !== "string" ||
      typeof subject !== "string" || typeof message !== "string"
    ) {
      return jsonResponse({ error: "Invalid input" }, 400);
    }

    if (name.length > 100 || email.length > 200 || subject.length > 200 || message.length > 5000) {
      return jsonResponse({ error: "Input too long" }, 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: "Invalid email address" }, 400);
    }

    if (!resend) {
      console.error("RESEND_API_KEY is not set. Email not sent.");
      return jsonResponse({ error: "Email service is not configured" }, 500);
    }

    const [safeName, safeEmail, safeSubject, safeMessage] = [
      escapeHtml(name),
      escapeHtml(email),
      escapeHtml(subject),
      escapeHtml(message),
    ];

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [TO_EMAIL],
      reply_to: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8f9fa; border-radius: 12px;">
          <h2 style="color: #111827; margin: 0 0 16px;">New Contact Message</h2>
          <table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 8px; overflow: hidden;">
            <tr>
              <td style="padding: 12px 16px; background: #f3f4f6; font-weight: bold; color: #374151; white-space: nowrap;">Name</td>
              <td style="padding: 12px 16px; color: #111827;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background: #f3f4f6; font-weight: bold; color: #374151;">Email</td>
              <td style="padding: 12px 16px; color: #111827;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background: #f3f4f6; font-weight: bold; color: #374151;">Subject</td>
              <td style="padding: 12px 16px; color: #111827;">${safeSubject}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background: #f3f4f6; font-weight: bold; color: #374151; vertical-align: top;">Message</td>
              <td style="padding: 12px 16px; color: #111827; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</td>
            </tr>
          </table>
          <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">
            Reply to this email or reach out at ${safeEmail} to respond directly.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return jsonResponse({ error: "Failed to send message" }, 500);
    }

    return jsonResponse({ success: true, message: "Message sent" });
  } catch {
    return jsonResponse({ error: "Invalid request" }, 400);
  }
}
