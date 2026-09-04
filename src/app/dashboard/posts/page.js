"use client";

import { useState, useEffect } from "react";

const EMPTY = {
  title: "",
  slug: "",
  description: "",
  content: "",
  tags: "",
  date: new Date().toISOString().slice(0, 10),
  published: true,
};

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editSlug, setEditSlug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const data = await fetch("/api/posts").then((r) => r.json());
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  function resetForm() {
    setForm(EMPTY);
    setEditSlug(null);
    setError("");
    setShowForm(false);
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function startEdit(post) {
    setForm({
      title: post.title,
      slug: post.slug,
      description: post.description || "",
      content: post.content || "",
      tags: (post.tags || []).join(", "),
      date: post.date || "",
      published: post.published !== false,
    });
    setEditSlug(post.slug);
    setError("");
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const body = {
      title: form.title,
      slug: slugify(form.slug || form.title),
      description: form.description,
      content: form.content,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      date: form.date,
      published: form.published,
    };

    const res = await fetch(
      editSlug ? `/api/posts/${editSlug}` : "/api/posts",
      {
        method: editSlug ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to save post");
      return;
    }

    resetForm();
    fetchPosts();
  }

  async function handleDelete(slug) {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    fetchPosts();
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm";

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 rounded-2xl bg-dark-100 border border-dark-200 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Blog Posts</h1>
          <p className="text-muted mt-1">Write and manage your blog articles</p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors"
        >
          {showForm ? "Cancel" : "+ New Post"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 mb-8 rounded-2xl bg-dark-100 border border-dark-200 space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1.5">Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    title: e.target.value,
                    slug: f.slug || slugify(e.target.value),
                  }))
                }
                className={inputClass}
                placeholder="How I Built CampNect with Django"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1.5">
                Slug (URL — auto from title, editable)
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className={inputClass}
                placeholder="how-i-built-campnect"
              />
              <p className="text-xs text-muted/60 mt-1">/blog/{form.slug ? slugify(form.slug) : "..."}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">
              Description (short summary — shows in Google &amp; blog listing)
            </label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className={inputClass}
              placeholder="One or two sentences about what this article covers"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">
              Content (blank line = new paragraph, ## = heading, - = bullet, **bold**, `code`)
            </label>
            <textarea
              rows={12}
              required
              value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              className={`${inputClass} font-code`}
              placeholder={"## Introduction\n\nWrite your article here...\n\n- Point one\n- Point two\n\n## Next Section\n\nMore content with **bold** and `code`."}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1.5">Tags (comma separated)</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                className={inputClass}
                placeholder="django, fullstack, tutorial"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1.5">Date</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-dark border border-dark-200 cursor-pointer w-full">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                  className="w-4 h-4 accent-blue-500"
                />
                <span className="text-sm text-white">Published</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors"
            >
              {editSlug ? "Update Post" : "Publish Post"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2.5 rounded-xl border border-dark-200 text-muted text-sm font-medium hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {posts.length === 0 ? (
        <div className="p-10 rounded-2xl bg-dark-100 border border-dark-200 text-center">
          <p className="text-muted">No posts yet. Click &quot;+ New Post&quot; to write your first article.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-2xl bg-dark-100 border border-dark-200"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-white truncate">{post.title}</h3>
                  {!post.published && (
                    <span className="px-2 py-0.5 rounded-lg bg-yellow-500/10 text-yellow-400 text-xs font-medium border border-yellow-500/20">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-muted text-xs mt-1 truncate">
                  /blog/{post.slug} · {post.date}
                  {post.tags?.length ? ` · ${post.tags.join(", ")}` : ""}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-dark-200 text-muted hover:text-white text-xs font-medium transition-colors"
                >
                  View
                </a>
                <button
                  onClick={() => startEdit(post)}
                  className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 text-xs font-medium transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.slug)}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
