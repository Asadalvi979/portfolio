"use client";

import { useState, useEffect, useRef } from "react";

const EMPTY = {
  name: "",
  title: "",
  email: "",
  phone: "",
  whatsapp: "",
  location: "",
  about: "",
  profileImage: "",
  cv: "",
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const imageInputRef = useRef(null);
  const cvInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const data = await fetch("/api/profile").then((r) => r.json());
    setProfile({ ...EMPTY, ...data });
    setLoading(false);
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setProfile((p) => ({ ...p, profileImage: reader.result }));
    reader.readAsDataURL(file);
  }

  function handleCvUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setProfile((p) => ({ ...p, cv: reader.result }));
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function clearImage() {
    setProfile((p) => ({ ...p, profileImage: "" }));
    if (imageInputRef.current) imageInputRef.current.value = "";
  }

  function clearCv() {
    setProfile((p) => ({ ...p, cv: "" }));
    if (cvInputRef.current) cvInputRef.current.value = "";
  }

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/50 focus:outline-none focus:border-accent/50 transition-all text-sm";

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 rounded-2xl bg-dark-100 border border-dark-200 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">Profile</h1>
          <p className="text-muted mt-1">Manage your profile image, CV, and personal details</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-green-400 text-sm font-medium">Saved successfully</span>}
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Image */}
          <div className="p-6 rounded-2xl bg-dark-100 border border-dark-200">
            <h2 className="text-lg font-bold font-heading text-white mb-4">Profile Image</h2>
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 rounded-2xl bg-dark border border-dark-200 overflow-hidden flex items-center justify-center shrink-0">
                {profile.profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.profileImage}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-muted text-4xl font-bold font-heading">
                    {profile.name ? profile.name.split(" ").map((w) => w[0]).join("").slice(0, 2) : "AS"}
                  </span>
                )}
              </div>
              <div className="flex-1 space-y-3 min-w-0">
                <label className="block text-sm text-muted mb-1">Upload image</label>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-muted file:mr-3 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-accent file:text-white file:text-sm file:font-medium hover:file:bg-accent-dark transition-colors"
                />
                <div>
                  <label className="block text-sm text-muted mb-1">Or image URL</label>
                  <input
                    type="url"
                    value={profile.profileImage.startsWith("data:") ? "" : profile.profileImage}
                    onChange={(e) => setProfile((p) => ({ ...p, profileImage: e.target.value }))}
                    placeholder="https://example.com/photo.jpg"
                    className={inputClass}
                  />
                </div>
                {profile.profileImage && (
                  <button
                    type="button"
                    onClick={clearImage}
                    className="px-4 py-2 rounded-xl bg-red-400/10 text-red-400 text-sm font-medium hover:bg-red-400/20 transition-colors border border-red-400/20"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* CV */}
          <div className="p-6 rounded-2xl bg-dark-100 border border-dark-200">
            <h2 className="text-lg font-bold font-heading text-white mb-4">CV / Resume</h2>
            <p className="text-sm text-muted mb-4">
              Upload a PDF file or provide a URL. It will be used for the &quot;Download Resume&quot; button.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-1">Upload PDF</label>
                <input
                  ref={cvInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleCvUpload}
                  className="block w-full text-sm text-muted file:mr-3 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-accent file:text-white file:text-sm file:font-medium hover:file:bg-accent-dark transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-muted mb-1">Or CV URL</label>
                <input
                  type="url"
                  value={profile.cv.startsWith("data:") ? "" : profile.cv}
                  onChange={(e) => setProfile((p) => ({ ...p, cv: e.target.value }))}
                  placeholder="https://example.com/resume.pdf"
                  className={inputClass}
                />
              </div>
              {profile.cv ? (
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={profile.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-colors border border-accent/20"
                  >
                    View CV
                  </a>
                  <button
                    type="button"
                    onClick={clearCv}
                    className="px-4 py-2 rounded-xl bg-red-400/10 text-red-400 text-sm font-medium hover:bg-red-400/20 transition-colors border border-red-400/20"
                  >
                    Remove CV
                  </button>
                </div>
              ) : (
                <p className="text-sm text-light-400 dark:text-muted/60">No CV uploaded yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Personal details */}
        <div className="p-6 rounded-2xl bg-dark-100 border border-dark-200">
          <h2 className="text-lg font-bold font-heading text-white mb-4">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pf-name" className="block text-sm text-muted mb-1">Full Name</label>
              <input
                required
                id="pf-name"
                value={profile.name}
                onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="pf-title" className="block text-sm text-muted mb-1">Title / Role</label>
              <input
                id="pf-title"
                value={profile.title}
                onChange={(e) => setProfile((p) => ({ ...p, title: e.target.value }))}
                className={inputClass}
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label htmlFor="pf-email" className="block text-sm text-muted mb-1">Email</label>
              <input
                type="email"
                id="pf-email"
                value={profile.email}
                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="pf-phone" className="block text-sm text-muted mb-1">Phone</label>
              <input
                id="pf-phone"
                value={profile.phone}
                onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                className={inputClass}
                placeholder="+92 300 1234567"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="pf-whatsapp" className="block text-sm text-muted mb-1">WhatsApp Number</label>
              <input
                id="pf-whatsapp"
                value={profile.whatsapp}
                onChange={(e) => setProfile((p) => ({ ...p, whatsapp: e.target.value }))}
                className={inputClass}
                placeholder="+92 300 1234567"
              />
            </div>
            <div>
              <label htmlFor="pf-location" className="block text-sm text-muted mb-1">Location</label>
              <input
                id="pf-location"
                value={profile.location}
                onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
                className={inputClass}
                placeholder="City, Country"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="pf-about" className="block text-sm text-muted mb-1">About / Bio</label>
            <textarea
              id="pf-about"
              rows={3}
              value={profile.about}
              onChange={(e) => setProfile((p) => ({ ...p, about: e.target.value }))}
              className={`${inputClass} resize-none`}
              placeholder="Short introduction about yourself"
            />
          </div>
          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}