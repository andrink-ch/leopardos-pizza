"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Login fehlgeschlagen");
      }
    } catch {
      setError("Netzwerkfehler – bitte erneut versuchen");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "px-4 py-[13px] rounded-[10px] bg-linen font-sans text-[15px] text-charcoal outline-none transition-colors focus:bg-white focus:border-ember";

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div
        className="bg-white rounded-[20px] p-10 w-full max-w-[400px]"
        style={{ boxShadow: "0 20px 60px -28px rgba(27,23,20,.4)" }}
      >
        <div className="text-center mb-8">
          <div className="font-heading font-bold text-[26px] flex items-center justify-center gap-[7px] mb-1">
            Leopardo&apos;s
            <span className="w-2 h-2 rounded-full bg-ember inline-block translate-y-0.5" />
          </div>
          <div className="text-stone text-[14px]">Admin-Bereich</div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-[6px]">
            <span className="text-[13px] font-semibold text-taupe">Benutzername</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              className={inputClass}
              style={{ border: "1.5px solid rgba(27,23,20,.15)" }}
            />
          </label>
          <label className="flex flex-col gap-[6px]">
            <span className="text-[13px] font-semibold text-taupe">Passwort</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className={inputClass}
              style={{ border: "1.5px solid rgba(27,23,20,.15)" }}
            />
          </label>

          {error && (
            <div className="text-[13px] text-red-600 bg-red-50 px-4 py-3 rounded-[10px] border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-[14px] rounded-[100px] bg-ember text-white font-sans font-semibold text-[16px] cursor-pointer hover:bg-[#C2491F] transition-colors border-none disabled:opacity-60"
          >
            {loading ? "Anmelden…" : "Anmelden"}
          </button>
        </form>
      </div>
    </div>
  );
}
