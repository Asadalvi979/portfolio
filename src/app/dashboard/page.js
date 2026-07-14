"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardHome() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      const [projects, categories, skills, experience, education, certifications, services] =
        await Promise.all([
          fetch("/api/projects").then((r) => r.json()),
          fetch("/api/categories").then((r) => r.json()),
          fetch("/api/skills").then((r) => r.json()),
          fetch("/api/experience").then((r) => r.json()),
          fetch("/api/education").then((r) => r.json()),
          fetch("/api/certifications").then((r) => r.json()),
          fetch("/api/services").then((r) => r.json()),
        ]);
      setStats({
        projects: projects.length,
        categories: categories.filter((c) => c.id !== "all").length,
        skills: skills.length,
        experience: experience.length,
        education: education.length,
        certifications: certifications.length,
        services: services.length,
      });
    }
    fetchStats();
  }, []);

  const cards = stats
    ? [
        { label: "Projects", value: stats.projects, color: "from-blue-500 to-blue-600", href: "/dashboard/projects" },
        { label: "Categories", value: stats.categories, color: "from-purple-500 to-purple-600", href: "/dashboard/categories" },
        { label: "Skills", value: stats.skills, color: "from-green-500 to-green-600", href: "/dashboard/skills" },
        { label: "Experience", value: stats.experience, color: "from-orange-500 to-orange-600", href: "/dashboard/experience" },
        { label: "Education", value: stats.education, color: "from-pink-500 to-pink-600", href: "/dashboard/education" },
        { label: "Certifications", value: stats.certifications, color: "from-yellow-500 to-yellow-600", href: "/dashboard/certifications" },
        { label: "Services", value: stats.services, color: "from-cyan-500 to-cyan-600", href: "/dashboard/services" },
      ]
    : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-white">Welcome Back, Asadullah</h1>
        <p className="text-muted mt-1">Manage your portfolio from here</p>
      </div>

      {!stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-dark-100 border border-dark-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="group relative overflow-hidden rounded-2xl bg-dark-100 border border-dark-200 p-6 hover:border-accent/30 transition-all duration-300"
            >
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.color} opacity-10 rounded-bl-[40px]`} />
              <p className="text-muted text-sm font-medium">{card.label}</p>
              <p className="text-3xl font-bold text-white mt-2 font-heading">{card.value}</p>
              <p className="text-accent text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                Manage {card.label.toLowerCase()} →
              </p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-8 p-6 rounded-2xl bg-dark-100 border border-dark-200">
        <h2 className="text-lg font-bold font-heading text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/projects" className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">
            Add New Project
          </Link>
          <Link href="/dashboard/skills" className="px-4 py-2 rounded-xl bg-dark-200 text-white text-sm font-medium hover:bg-dark-300 transition-colors border border-dark-300">
            Update Skills
          </Link>
          <Link href="/dashboard/categories" className="px-4 py-2 rounded-xl bg-dark-200 text-white text-sm font-medium hover:bg-dark-300 transition-colors border border-dark-300">
            Manage Categories
          </Link>
          <Link href="/" className="px-4 py-2 rounded-xl bg-dark-200 text-white text-sm font-medium hover:bg-dark-300 transition-colors border border-dark-300">
            View Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
