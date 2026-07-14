"use client";

import { useState, useEffect } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: "", label: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const data = await fetch("/api/categories").then((r) => r.json());
    setCategories(data);
    setLoading(false);
  }

  function resetForm() {
    setForm({ id: "", label: "" });
    setEditId(null);
    setShowForm(false);
  }

  function startEdit(cat) {
    setForm({ id: cat.id, label: cat.label });
    setEditId(cat.id);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const body = { id: form.id.toLowerCase().replace(/\s+/g, "-"), label: form.label };

    if (editId) {
      await fetch(`/api/categories/${editId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    } else {
      await fetch("/api/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    }
    resetForm();
    fetchCategories();
  }

  async function handleDelete(id) {
    if (id === "all") return alert("Cannot delete 'All Projects' category");
    if (!confirm("Delete this category?")) return;
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Categories</h1>
          <p className="text-muted mt-1">{categories.length} categories</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">
          + Add Category
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-2xl bg-dark-100 border border-dark-200">
          <h2 className="text-lg font-bold font-heading text-white mb-4">{editId ? "Edit Category" : "New Category"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cat-id" className="block text-sm text-muted mb-1">ID (slug)</label>
                <input required id="cat-id" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} disabled={!!editId}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm disabled:opacity-50"
                  placeholder="fullstack" />
              </div>
              <div>
                <label htmlFor="cat-label" className="block text-sm text-muted mb-1">Label</label>
                <input required id="cat-label" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm"
                  placeholder="Full Stack" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">
                {editId ? "Update" : "Add Category"}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-2.5 rounded-xl bg-dark-200 text-muted text-sm font-medium hover:bg-dark-300 transition-colors border border-dark-300">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <div key={i} className="h-16 rounded-2xl bg-dark-100 border border-dark-200 animate-pulse" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between p-5 rounded-2xl bg-dark-100 border border-dark-200">
              <div>
                <h3 className="text-white font-heading font-bold">{cat.label}</h3>
                <p className="text-muted text-sm">ID: {cat.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => startEdit(cat)} className="p-2 rounded-lg text-muted hover:text-white hover:bg-dark-200 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={() => handleDelete(cat.id)} disabled={cat.id === "all"} className="p-2 rounded-lg text-muted hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-30">
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
