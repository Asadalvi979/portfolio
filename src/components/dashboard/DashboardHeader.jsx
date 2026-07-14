"use client";

import { useState } from "react";

export default function DashboardHeader({ onMenuToggle }) {
  return (
    <header className="sticky top-0 z-30 bg-dark-50/80 backdrop-blur-xl border-b border-dark-200">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-muted hover:text-white hover:bg-dark-200 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-100 border border-dark-200 text-sm text-muted">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
