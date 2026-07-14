"use client";

import { useState, useEffect } from "react";

export default function CertificationsPage() {
  const [certs, setCerts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", issuer: "", duration: "", description: "" });

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    const data = await fetch("/api/certifications").then((r) => r.json());
    setCerts(data);
    setLoading(false);
  }

  function resetForm() { setForm({ title: "", issuer: "", duration: "", description: "" }); setEditIdx(null); setShowForm(false); }

  function startEdit(item, idx) {
    setForm({ title: item.title, issuer: item.issuer, duration: item.duration, description: item.description });
    setEditIdx(idx);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editIdx !== null) {
      await fetch(`/api/certifications/${editIdx}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/certifications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    resetForm();
    fetchData();
  }

  async function handleDelete(idx) {
    if (!confirm("Delete this certification?")) return;
    await fetch(`/api/certifications/${idx}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Certifications</h1>
          <p className="text-muted mt-1">{certs.length} certifications</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">
          + Add Certification
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-2xl bg-dark-100 border border-dark-200">
          <h2 className="text-lg font-bold font-heading text-white mb-4">{editIdx !== null ? "Edit Certification" : "New Certification"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cert-title" className="block text-sm text-muted mb-1">Title</label>
                <input required id="cert-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm" placeholder="Certification title" />
              </div>
              <div>
                <label htmlFor="cert-issuer" className="block text-sm text-muted mb-1">Issuer</label>
                <input required id="cert-issuer" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm" placeholder="Issuing organization" />
              </div>
              <div>
                <label htmlFor="cert-duration" className="block text-sm text-muted mb-1">Duration</label>
                <input required id="cert-duration" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm" placeholder="2023-2024" />
              </div>
            </div>
            <div>
              <label htmlFor="cert-desc" className="block text-sm text-muted mb-1">Description</label>
              <textarea required id="cert-desc" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm resize-none" placeholder="Description" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">
                {editIdx !== null ? "Update" : "Add Certification"}
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
          {certs.map((cert, idx) => (
            <div key={idx} className="flex items-start justify-between p-5 rounded-2xl bg-dark-100 border border-dark-200">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-white font-heading font-bold">{cert.title}</h3>
                  <span className="px-2 py-0.5 rounded-lg bg-accent/10 text-accent text-xs font-mono">{cert.duration}</span>
                </div>
                <p className="text-muted text-sm">{cert.issuer}</p>
                <p className="text-muted/70 text-sm mt-1 line-clamp-2">{cert.description}</p>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <button onClick={() => startEdit(cert, idx)} className="p-2 rounded-lg text-muted hover:text-white hover:bg-dark-200 transition-all">
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
