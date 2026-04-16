"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="card w-full max-w-md mx-auto p-8 border border-border hover:border-border transition-all">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-white mb-2">Sign In</h2>
        <p className="text-text-secondary text-sm">Access your membership details and subscription status</p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/50 text-destructive text-sm rounded p-3 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-surface-alt border border-border rounded-button px-4 py-2.5 text-white focus:outline-none focus:border-accent transition-colors"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface-alt border border-border rounded-button px-4 py-2.5 text-white focus:outline-none focus:border-accent transition-colors"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full mt-6"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-text-secondary">
        <p>Return to <Link href="/" className="text-accent hover:text-white transition-colors">Homepage</Link></p>
      </div>
    </div>
  );
}
