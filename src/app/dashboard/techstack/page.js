"use client";

import { useState, useEffect } from "react";

const ICON_OPTIONS = ["html", "css", "javascript", "bootstrap", "django", "php", "mysql", "cpp", "coal", "github", "claude", "react", "nodejs", "python", "java", "typescript", "tailwind", "figma", "vscode", "docker"];

export default function TechStackPage() {
  const [techStack, setTechStack] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", icon: "html" });

  useEffect(() => { fetchTechStack(); }, []);

  async function fetchTechStack() {
    setLoading(true);
    const data = await fetch("/api/techstack").then((r) => r.json());
    setTechStack(data);
    setLoading(false);
  }

  async function handleAdd(e) {
    e.preventDefault();
    const updated = { ...techStack };
    if (!updated[activeCategory]) updated[activeCategory] = [];
    updated[activeCategory] = [...updated[activeCategory], { name: form.name, icon: form.icon }];
    await fetch("/api/techstack", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    setForm({ name: "", icon: "html" });
    setShowForm(false);
    fetchTechStack();
  }

  async function handleDelete(category, idx) {
    if (!confirm("Delete this tech item?")) return;
    const updated = { ...techStack };
    updated[category] = updated[category].filter((_, i) => i !== idx);
    await fetch("/api/techstack", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updated) });
    fetchTechStack();
  }

  const categoryColors = {
    frontend: "from-blue-500 to-cyan-500",
    backend: "from-green-500 to-emerald-500",
    database: "from-orange-500 to-red-500",
    programming: "from-purple-500 to-pink-500",
    tools: "from-yellow-500 to-amber-500",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Tech Stack</h1>
          <p className="text-muted mt-1">Manage your technologies by category</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {Object.keys(techStack).map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${activeCategory === cat ? "bg-accent text-white" : "bg-dark-100 text-muted border border-dark-200 hover:bg-dark-200"}`}>
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 rounded-2xl bg-dark-100 border border-dark-200 animate-pulse" />)}</div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-heading text-white capitalize">{activeCategory}</h2>
            <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">
              + Add Item
            </button>
          </div>

          {showForm && (
            <div className="mb-6 p-4 rounded-2xl bg-dark-100 border border-dark-200">
              <form onSubmit={handleAdd} className="flex gap-3 items-end">
                <div className="flex-1">
                  <label htmlFor="tech-name" className="block text-sm text-muted mb-1">Name</label>
                  <input required id="tech-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm"
                    placeholder="React" />
                </div>
                <div className="w-40">
                  <label htmlFor="tech-icon" className="block text-sm text-muted mb-1">Icon</label>
                  <select id="tech-icon" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white focus:outline-none focus:border-accent/50 transition-all text-sm">
                    {ICON_OPTIONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                  </select>
                </div>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">
                  Add
                </button>
              </form>
            </div>
          )}

          <div className="space-y-3">
            {(techStack[activeCategory] || []).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-dark-100 border border-dark-200">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${categoryColors[activeCategory] || "from-gray-500 to-gray-600"} flex items-center justify-center text-white text-xs font-bold`}>
                    {item.icon.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-white font-heading font-bold">{item.name}</h3>
                    <p className="text-muted text-xs">Icon: {item.icon}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(activeCategory, idx)} className="p-2 rounded-lg text-muted hover:text-red-400 hover:bg-red-400/10 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))}
            {(!techStack[activeCategory] || techStack[activeCategory].length === 0) && (
              <p className="text-muted text-center py-8">No items in this category yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
