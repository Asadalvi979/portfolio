"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          router.replace("/dashboard");
        } else {
          setChecking(false);
        }
      })
      .catch(() => setChecking(false));
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Invalid email or password");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  if (checking) return null;

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white font-bold font-heading text-2xl mx-auto">
              AS
            </div>
          </Link>
          <h1 className="text-2xl font-bold font-heading text-white mt-6">Welcome Back</h1>
          <p className="text-muted mt-2 text-sm">Login to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl bg-dark-100 border border-dark-200">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="login-email" className="block text-sm text-muted mb-1.5">Email</label>
            <input
              type="email"
              id="login-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all text-sm"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block text-sm text-muted mb-1.5">Password</label>
            <input
              type="password"
              id="login-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-dark border border-dark-200 text-white placeholder-muted/40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all text-sm"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/" className="text-muted hover:text-white text-sm transition-colors">
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
