"use client";

import { useState, useEffect } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    category: "fullstack",
    description: "",
    technologies: "",
    github: "",
    live: "",
  });

  useEffect(() => {
    fetchProjects();
    fetch("/api/categories").then((r) => r.json()).then(setCategories);
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const data = await fetch("/api/projects").then((r) => r.json());
    setProjects(data);
    setLoading(false);
  }

  function resetForm() {
    setForm({ title: "", category: "fullstack", description: "", technologies: "", github: "", live: "" });
    setEditIdx(null);
    setShowForm(false);
  }

  function startEdit(project) {
    setForm({
      title: project.title,
      category: project.category,
      description: project.description,
      technologies: project.technologies.join(", "),
      github: project.github || "",
      live: project.live || "",
    });
    setEditIdx(project.id);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const body = {
      ...form,
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      image: null,
      screenshots: [],
    };

    if (!editIdx) {
      body.subProjects = [];
    }

    if (editIdx) {
      await fetch(`/api/projects/${editIdx}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    } else {
      await fetch("/api/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    }
    resetForm();
    fetchProjects();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Projects</h1>
          <p className="text-muted mt-1">{projects.length} projects total</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors"
        >
          + Add Project
        </button>
      </div>

      {showForm && (
        <div className="mb-8 p-6 rounded-2xl bg-dark-100 border border-dark-200">
          <h2 className="text-lg font-bold font-heading text-white mb-4">
            {editIdx ? "Edit Project" : "New Project"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="proj-title" className="block text-sm text-muted mb-1">Title</label>
                <input
                  required
                  id="proj-title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm"
                  placeholder="Project title"
                />
              </div>
              <div>
                <label htmlFor="proj-category" className="block text-sm text-muted mb-1">Category</label>
                <select
                  id="proj-category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white focus:outline-none focus:border-accent/50 transition-all text-sm"
                >
                  {categories.filter((c) => c.id !== "all").map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="proj-desc" className="block text-sm text-muted mb-1">Description</label>
              <textarea
                required
                id="proj-desc"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm resize-none"
                placeholder="Project description"
              />
            </div>
            <div>
              <label htmlFor="proj-tech" className="block text-sm text-muted mb-1">Technologies (comma separated)</label>
              <input
                id="proj-tech"
                value={form.technologies}
                onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm"
                placeholder="HTML, CSS, JavaScript, React"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="proj-github" className="block text-sm text-muted mb-1">GitHub URL</label>
                <input
                  id="proj-github"
                  value={form.github}
                  onChange={(e) => setForm({ ...form, github: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm"
                  placeholder="https://github.com/..."
                />
              </div>
              <div>
                <label htmlFor="proj-live" className="block text-sm text-muted mb-1">Live URL</label>
                <input
                  id="proj-live"
                  value={form.live}
                  onChange={(e) => setForm({ ...form, live: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors">
                {editIdx ? "Update" : "Add Project"}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-2.5 rounded-xl bg-dark-200 text-muted text-sm font-medium hover:bg-dark-300 transition-colors border border-dark-300">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-dark-100 border border-dark-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-5 rounded-2xl bg-dark-100 border border-dark-200 hover:border-dark-300 transition-all">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-white font-heading font-bold truncate">{project.title}</h3>
                  <span className="px-2 py-0.5 rounded-lg bg-accent/10 text-accent text-xs font-medium shrink-0">
                    {categories.find((c) => c.id === project.category)?.label || project.category}
                  </span>
                  {project.subProjects && project.subProjects.length > 0 && (
                    <span className="px-2 py-0.5 rounded-lg bg-green-500/10 text-green-400 text-xs font-medium shrink-0">
                      {project.subProjects.length} mini projects
                    </span>
                  )}
                </div>
                <p className="text-muted text-sm truncate">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.technologies.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-dark-200 text-light-400 dark:text-muted text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4 shrink-0">
                <button onClick={() => startEdit(project)} className="p-2 rounded-lg text-muted hover:text-white hover:bg-dark-200 transition-all" title="Edit">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button onClick={() => handleDelete(project.id)} className="p-2 rounded-lg text-muted hover:text-red-400 hover:bg-red-400/10 transition-all" title="Delete">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
