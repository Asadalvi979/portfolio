"use client";

import { useState, useEffect } from "react";

export default function EducationPage() {
  const [education, setEducation] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ year: "", title: "", institution: "", description: "" });

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    const data = await fetch("/api/education").then((r) => r.json());
    setEducation(data);
    setLoading(false);
  }

  function resetForm() { setForm({ year: "", title: "", institution: "", description: "" }); setEditIdx(null); setShowForm(false); }

  function startEdit(item, idx) {
    setForm({ year: item.year, title: item.title, institution: item.institution, description: item.description });
    setEditIdx(idx);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editIdx !== null) {
      await fetch(`/api/education/${editIdx}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/education", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    resetForm();
    fetchData();
  }

  async function handleDelete(idx) {
    if (!confirm("Delete this education entry?")) return;
    await fetch(`/api/education/${idx}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Education</h1>
          <p className="text-muted mt-1">{education.length} entries</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">
          + Add Education
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-2xl bg-dark-100 border border-dark-200">
          <h2 className="text-lg font-bold font-heading text-white mb-4">{editIdx !== null ? "Edit Education" : "New Education"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="edu-year" className="block text-sm text-muted mb-1">Year</label>
                <input required id="edu-year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm" placeholder="2024" />
              </div>
              <div>
                <label htmlFor="edu-title" className="block text-sm text-muted mb-1">Title</label>
                <input required id="edu-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm" placeholder="Degree or milestone" />
              </div>
            </div>
            <div>
              <label htmlFor="edu-inst" className="block text-sm text-muted mb-1">Institution</label>
              <input required id="edu-inst" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm" placeholder="University or institution" />
            </div>
            <div>
              <label htmlFor="edu-desc" className="block text-sm text-muted mb-1">Description</label>
              <textarea required id="edu-desc" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm resize-none" placeholder="Description" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">
                {editIdx !== null ? "Update" : "Add Education"}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-2.5 rounded-xl bg-dark-200 text-muted text-sm font-medium hover:bg-dark-300 transition-colors border border-dark-300">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[...Array(2)].map((_, i) => <div key={i} className="h-24 rounded-2xl bg-dark-100 border border-dark-200 animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {education.map((item, idx) => (
            <div key={idx} className="flex items-start justify-between p-5 rounded-2xl bg-dark-100 border border-dark-200">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-white font-heading font-bold">{item.title}</h3>
                  <span className="px-2 py-0.5 rounded-lg bg-accent/10 text-accent text-xs font-mono">{item.year}</span>
                </div>
                <p className="text-muted text-sm">{item.institution}</p>
                <p className="text-muted/70 text-sm mt-1 line-clamp-2">{item.description}</p>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <button onClick={() => startEdit(item, idx)} className="p-2 rounded-lg text-muted hover:text-white hover:bg-dark-200 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={() => handleDelete(idx)} className="p-2 rounded-lg text-muted hover:text-red-400 hover:bg-red-400/10 transition-all">
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
