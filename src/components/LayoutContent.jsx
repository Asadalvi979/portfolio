"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const HIDE_NAV_ROUTES = ["/dashboard", "/login"];

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const isDashboard = HIDE_NAV_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );

  return (
    <>
      {!isDashboard && <CustomCursor />}
      {!isDashboard && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}
