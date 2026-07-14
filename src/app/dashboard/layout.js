"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("dashboard_auth") === "true") {
      setAuthorized(true);
    } else {
      router.replace("/login");
    }
  }, [router]);

  if (!authorized) return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-dark text-text">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-64">
        <DashboardHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
