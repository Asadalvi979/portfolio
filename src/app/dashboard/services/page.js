"use client";

import { useState, useEffect } from "react";

const ICON_OPTIONS = ["code", "layout", "server", "globe", "cloud", "database", "mobile", "palette"];

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", icon: "code" });

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    const data = await fetch("/api/services").then((r) => r.json());
    setServices(data);
    setLoading(false);
  }

  function resetForm() { setForm({ title: "", description: "", icon: "code" }); setEditIdx(null); setShowForm(false); }

  function startEdit(item, idx) {
    setForm({ title: item.title, description: item.description, icon: item.icon });
    setEditIdx(idx);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editIdx !== null) {
      await fetch(`/api/services/${editIdx}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    resetForm();
    fetchData();
  }

  async function handleDelete(idx) {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/services/${idx}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Services</h1>
          <p className="text-muted mt-1">{services.length} services</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">
          + Add Service
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-2xl bg-dark-100 border border-dark-200">
          <h2 className="text-lg font-bold font-heading text-white mb-4">{editIdx !== null ? "Edit Service" : "New Service"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="svc-title" className="block text-sm text-muted mb-1">Title</label>
                <input required id="svc-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm" placeholder="Service title" />
              </div>
              <div>
                <label htmlFor="svc-icon" className="block text-sm text-muted mb-1">Icon</label>
                <select id="svc-icon" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white focus:outline-none focus:border-accent/50 transition-all text-sm">
                  {ICON_OPTIONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="svc-desc" className="block text-sm text-muted mb-1">Description</label>
              <textarea required id="svc-desc" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm resize-none" placeholder="Service description" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">
                {editIdx !== null ? "Update" : "Add Service"}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-2.5 rounded-xl bg-dark-200 text-muted text-sm font-medium hover:bg-dark-300 transition-colors border border-dark-300">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 rounded-2xl bg-dark-100 border border-dark-200 animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {services.map((service, idx) => (
            <div key={idx} className="flex items-center justify-between p-5 rounded-2xl bg-dark-100 border border-dark-200">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-heading font-bold truncate">{service.title}</h3>
                  <p className="text-muted text-sm truncate">{service.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <button onClick={() => startEdit(service, idx)} className="p-2 rounded-lg text-muted hover:text-white hover:bg-dark-200 transition-all">
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
