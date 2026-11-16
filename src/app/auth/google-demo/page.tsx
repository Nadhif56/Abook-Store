"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Plus, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

function GoogleDemoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/";

  const [isLoading, setIsLoading] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customEmail, setCustomEmail] = useState("");

  const handleSelectAccount = async (name: string, email: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/google/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, redirect: redirectTarget }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal masuk");

      router.push(data.redirect || "/");
      router.refresh();
    } catch (err: any) {
      alert(err.message);
      setIsLoading(false);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    handleSelectAccount(customName || customEmail.split("@")[0], customEmail);
  };

  return (
    <div className="w-full max-w-md bg-paper-subtle border border-paper-border rounded-2xl shadow-card p-6 sm:p-8">
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-espresso-deep mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali</span>
      </Link>

      {/* Google Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-paper-canvas border border-paper-border mb-3 shadow-subtle">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        </div>
        <h1 className="font-serif text-xl font-bold text-espresso-deep">
          Pilih Akun Google
        </h1>
        <p className="text-xs text-secondary mt-1">
          untuk melanjutkan ke <span className="font-semibold text-espresso-deep">Abook Store</span>
        </p>
      </div>

      {/* Info Box */}
      <div className="mb-5 p-3 rounded-xl bg-surface-container border border-paper-border text-xs text-secondary flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-espresso-deep block">Mode Integrasi Cepat Google:</span>
          Pilih salah satu akun di bawah ini untuk langsung masuk atau buat akun baru secara praktis.
        </div>
      </div>

      {/* Account List */}
      <div className="space-y-2 mb-4">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleSelectAccount("Budi Pembaca", "budi.pembaca@gmail.com")}
          className="w-full flex items-center justify-between p-3 rounded-xl border border-paper-border bg-paper-canvas hover:bg-surface-container active:scale-[0.99] transition-all text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm border border-blue-200">
              BP
            </div>
            <div>
              <p className="text-sm font-semibold text-espresso-deep group-hover:text-terracotta transition-colors">
                Budi Pembaca
              </p>
              <p className="text-xs text-secondary">budi.pembaca@gmail.com</p>
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-muted group-hover:text-terracotta transition-colors" />
        </button>

        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleSelectAccount("Nadhif Literasi", "nadhif.literasi@gmail.com")}
          className="w-full flex items-center justify-between p-3 rounded-xl border border-paper-border bg-paper-canvas hover:bg-surface-container active:scale-[0.99] transition-all text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm border border-emerald-200">
              NL
            </div>
            <div>
              <p className="text-sm font-semibold text-espresso-deep group-hover:text-terracotta transition-colors">
                Nadhif Literasi
              </p>
              <p className="text-xs text-secondary">nadhif.literasi@gmail.com</p>
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-muted group-hover:text-terracotta transition-colors" />
        </button>
      </div>

      {/* Custom Email Toggle */}
      {!showCustom ? (
        <button
          type="button"
          onClick={() => setShowCustom(true)}
          className="w-full py-2.5 px-3 rounded-xl border border-dashed border-paper-border text-xs font-semibold text-secondary hover:text-espresso-deep hover:border-espresso-deep/40 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Gunakan Akun Google Lain</span>
        </button>
      ) : (
        <form onSubmit={handleCustomSubmit} className="space-y-3 pt-2 border-t border-paper-border">
          <div>
            <label className="block text-[11px] font-semibold text-espresso-deep uppercase mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Contoh: Rian Anggara"
              className="w-full px-3 py-2 text-xs rounded-lg border border-paper-border bg-paper-canvas text-espresso-deep"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-espresso-deep uppercase mb-1">
              Alamat Email Google (@gmail.com)
            </label>
            <input
              type="email"
              required
              value={customEmail}
              onChange={(e) => setCustomEmail(e.target.value)}
              placeholder="rian.anggara@gmail.com"
              className="w-full px-3 py-2 text-xs rounded-lg border border-paper-border bg-paper-canvas text-espresso-deep"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-3 rounded-lg bg-espresso-deep hover:bg-olive-umber text-ivory-bright text-xs font-semibold flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Lanjutkan Masuk</span>}
          </button>
        </form>
      )}

      {isLoading && (
        <div className="mt-4 text-center text-xs text-terracotta flex items-center justify-center gap-1.5 font-medium">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Menyiapkan sesi akun Google Anda...</span>
        </div>
      )}
    </div>
  );
}

export default function GoogleDemoPage() {
  return (
    <div className="min-h-screen bg-paper-canvas flex flex-col justify-center items-center py-12 px-4 sm:px-6">
      <Suspense fallback={
        <div className="p-8 text-center text-secondary text-sm flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-terracotta" />
          <span>Memuat antarmuka akun Google...</span>
        </div>
      }>
        <GoogleDemoContent />
      </Suspense>
    </div>
  );
}
