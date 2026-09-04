import { jsonResponse } from "@/lib/apiHelper";
import { SESSION_COOKIE } from "@/lib/auth";

export async function POST() {
  const response = jsonResponse({ success: true });
  response.headers.append(
    "Set-Cookie",
    `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`
  );
  return response;
}
