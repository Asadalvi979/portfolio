import { Resend } from "resend";
import { jsonResponse } from "@/lib/apiHelper";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const TO_EMAIL = "asadullahsadiqalvi@gmail.com";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return jsonResponse({ error: "All fields are required" }, 400);
    }

    if (!resend) {
      console.error("RESEND_API_KEY is not set. Email not sent.");
      return jsonResponse({ error: "Email service is not configured" }, 500);
    }

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
              <td style="padding: 12px 16px; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background: #f3f4f6; font-weight: bold; color: #374151;">Email</td>
              <td style="padding: 12px 16px; color: #111827;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background: #f3f4f6; font-weight: bold; color: #374151;">Subject</td>
              <td style="padding: 12px 16px; color: #111827;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background: #f3f4f6; font-weight: bold; color: #374151; vertical-align: top;">Message</td>
              <td style="padding: 12px 16px; color: #111827; line-height: 1.6; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">
            Reply to this email or reach out at ${email} to respond directly.
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