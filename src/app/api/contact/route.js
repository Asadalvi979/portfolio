import { jsonResponse } from "@/lib/apiHelper";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return jsonResponse({ error: "All fields are required" }, 400);
    }

    console.log("Contact form submission:", { name, email, subject, message });

    return jsonResponse({ success: true, message: "Message received" });
  } catch {
    return jsonResponse({ error: "Invalid request" }, 400);
  }
}
