"use client";

import { useState, useEffect } from "react";

const ICON_OPTIONS = [
  "github",
  "linkedin",
  "twitter",
  "facebook",
  "instagram",
  "whatsapp",
  "email",
  "phone",
  "youtube",
  "telegram",
  "dribbble",
];

export default function SocialsPage() {
  const [socials, setSocials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ label: "", url: "", icon: "github" });

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    const data = await fetch("/api/socials").then((r) => r.json());
    setSocials(data);
    setLoading(false);
  }

  function resetForm() {
    setForm({ label: "", url: "", icon: "github" });
    setEditIdx(null);
    setShowForm(false);
  }

  function startEdit(item, idx) {
    setForm({ label: item.label, url: item.url, icon: item.icon || "github" });
    setEditIdx(idx);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editIdx !== null) {
      await fetch(`/api/socials/${editIdx}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/socials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    resetForm();
    fetchData();
  }

  async function handleDelete(idx) {
    if (!confirm("Delete this social link?")) return;
    await fetch(`/api/socials/${idx}`, { method: "DELETE" });
    fetchData();
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Social Links</h1>
          <p className="text-muted mt-1">{socials.length} social links</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors"
        >
          + Add Social Link
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-2xl bg-dark-100 border border-dark-200">
          <h2 className="text-lg font-bold font-heading text-white mb-4">
            {editIdx !== null ? "Edit Social Link" : "New Social Link"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="scl-label" className="block text-sm text-muted mb-1">Label</label>
                <input
                  required
                  id="scl-label"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className={inputClass}
                  placeholder="GitHub"
                />
              </div>
              <div>
                <label htmlFor="scl-icon" className="block text-sm text-muted mb-1">Icon</label>
                <select
                  id="scl-icon"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className={inputClass}
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-1">
                <label htmlFor="scl-url" className="block text-sm text-muted mb-1">URL</label>
                <input
                  required
                  type="url"
                  id="scl-url"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className={inputClass}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors"
              >
                {editIdx !== null ? "Update" : "Add Social Link"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 rounded-xl bg-dark-200 text-muted text-sm font-medium hover:bg-dark-300 transition-colors border border-dark-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-dark-100 border border-dark-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {socials.map((social, idx) => (
            <div key={idx} className="flex items-center justify-between p-5 rounded-2xl bg-dark-100 border border-dark-200">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 uppercase">
                  {social.label.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-heading font-bold truncate">{social.label}</h3>
                    <span className="px-2 py-0.5 rounded-md bg-dark-200 border border-dark-300 text-muted text-xs font-mono shrink-0">
                      {social.icon}
                    </span>
                  </div>
                  <p className="text-muted text-sm truncate">{social.url}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <button
                  onClick={() => startEdit(social, idx)}
                  className="p-2 rounded-lg text-muted hover:text-white hover:bg-dark-200 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="p-2 rounded-lg text-muted hover:text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
          {socials.length === 0 && (
            <p className="text-center text-muted py-10">No social links yet. Add your first one.</p>
          )}
        </div>
      )}
    </div>
  );
}