"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { ArrowLeft, Lock, Mail, User, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const err = params.get("error");
      if (err === "google_not_configured") {
        setErrorMessage(
          "Koneksi Google Sign-In asli memerlukan GOOGLE_CLIENT_ID dan GOOGLE_CLIENT_SECRET di file .env.local atau Vercel. Silakan masukkan kunci Google Cloud Anda."
        );
      } else if (err === "google_auth_failed") {
        setErrorMessage("Otentikasi dengan akun Google dibatalkan atau gagal.");
      } else if (err === "google_server_error") {
        setErrorMessage("Terjadi kesalahan saat memproses akun Google Anda.");
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Kata sandi minimal 6 karakter.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal melakukan pendaftaran akun.");
      }

      // Berhasil mendaftar (role 'user') -> langsung alihkan ke beranda
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper-canvas flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-secondary hover:text-espresso-deep mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="text-center">
          <Logo size="lg" className="justify-center mb-4" />
          <h2 className="font-serif text-2xl font-bold tracking-tight text-espresso-deep">
            Daftar Akun Baru
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Sudah memiliki akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-terracotta hover:underline underline-offset-4"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-paper-subtle/50 py-8 px-6 shadow-card sm:rounded-2xl sm:px-10 border border-paper-border">
          {/* Opsi Cepat: Daftar dengan Akun Google */}
          <div className="mb-6">
            <GoogleAuthButton mode="register" />
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-paper-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-paper-subtle px-3 text-secondary font-medium uppercase tracking-wider">
                  atau daftar dengan email
                </span>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-espresso-deep uppercase tracking-wider mb-1.5"
              >
                Nama Lengkap
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-paper-border bg-paper-canvas text-sm text-espresso-deep placeholder:text-secondary/60 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all shadow-subtle"
                />
                <User className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-espresso-deep uppercase tracking-wider mb-1.5"
              >
                Alamat Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-paper-border bg-paper-canvas text-sm text-espresso-deep placeholder:text-secondary/60 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all shadow-subtle"
                />
                <Mail className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-espresso-deep uppercase tracking-wider mb-1.5"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-paper-border bg-paper-canvas text-sm text-espresso-deep placeholder:text-secondary/60 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all shadow-subtle"
                />
                <Lock className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold text-espresso-deep uppercase tracking-wider mb-1.5"
              >
                Ulangi Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Masukkan kata sandi yang sama"
                  className="block w-full pl-10 pr-3 py-2.5 rounded-xl border border-paper-border bg-paper-canvas text-sm text-espresso-deep placeholder:text-secondary/60 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all shadow-subtle"
                />
                <CheckCircle2 className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-espresso-deep hover:bg-olive-umber focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-terracotta text-ivory-bright font-semibold text-sm shadow-card transition-all disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin text-terracotta" />
                    <span>Mendaftarkan...</span>
                  </>
                ) : (
                  <span>Daftar Sekarang</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

