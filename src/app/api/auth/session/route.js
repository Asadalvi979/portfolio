import { jsonResponse } from "@/lib/apiHelper";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  return jsonResponse({ authenticated: await isAuthenticated() });
}
