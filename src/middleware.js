import { NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

// Public API endpoints that must stay reachable without a session.
const PUBLIC_API = [
  "/api/contact", // contact form POST
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/session",
];

async function hasValidSession(req) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  try {
    return await verifySessionToken(token);
  } catch {
    return false;
  }
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Dashboard pages: redirect to login without a valid session cookie.
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    if (!(await hasValidSession(req))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // API routes: block mutations (POST/PUT/DELETE/PATCH) unless public.
  const isMutation = !["GET", "HEAD", "OPTIONS"].includes(req.method);
  const isPublic = PUBLIC_API.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isMutation && !isPublic && !(await hasValidSession(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
