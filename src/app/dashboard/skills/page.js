"use client";

import { useState, useEffect } from "react";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editName, setEditName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", level: 80 });

  useEffect(() => { fetchSkills(); }, []);

  async function fetchSkills() {
    setLoading(true);
    const data = await fetch("/api/skills").then((r) => r.json());
    setSkills(data);
    setLoading(false);
  }

  function resetForm() { setForm({ name: "", level: 80 }); setEditName(null); setShowForm(false); }

  function startEdit(skill) {
    setForm({ name: skill.name, level: skill.level });
    setEditName(skill.name);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editName) {
      await fetch(`/api/skills/${encodeURIComponent(editName)}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/skills", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    resetForm();
    fetchSkills();
  }

  async function handleDelete(name) {
    if (!confirm(`Delete skill "${name}"?`)) return;
    await fetch(`/api/skills/${encodeURIComponent(name)}`, { method: "DELETE" });
    fetchSkills();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Skills</h1>
          <p className="text-muted mt-1">{skills.length} skills</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">
          + Add Skill
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-2xl bg-dark-100 border border-dark-200">
          <h2 className="text-lg font-bold font-heading text-white mb-4">{editName ? "Edit Skill" : "New Skill"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="skill-name" className="block text-sm text-muted mb-1">Name</label>
                <input required id="skill-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={!!editName}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm disabled:opacity-50"
                  placeholder="JavaScript" />
              </div>
              <div>
                <label htmlFor="skill-level" className="block text-sm text-muted mb-1">Level ({form.level}%)</label>
                <input type="range" id="skill-level" min="0" max="100" value={form.level} onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
                  className="w-full mt-2 accent-accent" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">
                {editName ? "Update" : "Add Skill"}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-2.5 rounded-xl bg-dark-200 text-muted text-sm font-medium hover:bg-dark-300 transition-colors border border-dark-300">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-16 rounded-2xl bg-dark-100 border border-dark-200 animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.name} className="flex items-center justify-between p-5 rounded-2xl bg-dark-100 border border-dark-200">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-heading font-bold">{skill.name}</h3>
                  <span className="text-accent text-sm font-mono">{skill.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-dark-200 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light transition-all duration-500" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <button onClick={() => startEdit(skill)} className="p-2 rounded-lg text-muted hover:text-white hover:bg-dark-200 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={() => handleDelete(skill.name)} className="p-2 rounded-lg text-muted hover:text-red-400 hover:bg-red-400/10 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
