"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { Menu, X, MessageCircle, User, Shield, LogOut, ShoppingBag } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; role: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Cek status sesi login
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.reload();
  };

  const navLinks = [
    { name: "Beranda", href: "/#beranda" },
    { name: "Katalog Buku", href: "/#katalog" },
    { name: "Tentang Kami", href: "/#tentang" },
    { name: "Keunggulan", href: "/#layanan" },
    { name: "Kabar & Resensi", href: "/#kabar" },
    { name: "Lokasi & Kontak", href: "/#kontak" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-paper-canvas/95 backdrop-blur-md shadow-subtle border-b border-paper-border/60 py-3"
          : "bg-paper-canvas/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/#beranda"
            className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-lg"
          >
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Navigasi Utama">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-colors text-on-surface-variant hover:text-espresso-deep hover:bg-surface-container/60"
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Auth & CTA Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/pesanan-saya"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-paper-border bg-paper-canvas hover:bg-surface-container text-xs sm:text-sm font-semibold text-espresso-deep transition-colors shadow-subtle"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-terracotta" />
                  <span>Pesanan Anda</span>
                </Link>

                {user.role === "admin" ? (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-paper-border text-xs sm:text-sm font-semibold text-espresso-deep hover:bg-surface-container-high transition-colors shadow-subtle"
                  >
                    <Shield className="w-3.5 h-3.5 text-terracotta" />
                    <span>Dashboard Admin</span>
                  </Link>
                ) : (
                  <span className="text-xs font-semibold text-secondary hidden sm:inline">
                    Halo, {user.name}
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  title="Keluar Akun"
                  className="p-1.5 rounded-lg text-secondary hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-paper-border text-xs sm:text-sm font-semibold text-espresso-deep hover:bg-surface-container transition-colors"
              >
                <User className="w-3.5 h-3.5 text-secondary" />
                <span>Masuk</span>
              </Link>
            )}

            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Halo%20Abook%20Store%2C%20saya%20tertarik%20dengan%20katalog%20buku%20Anda`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-espresso-deep hover:bg-olive-umber text-ivory-bright text-xs sm:text-sm font-semibold shadow-subtle transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 text-terracotta" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-on-surface-variant hover:text-espresso-deep hover:bg-surface-container focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              aria-expanded={mobileMenuOpen}
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-paper-canvas border-b border-paper-border px-4 pt-3 pb-6 space-y-2 shadow-card">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium transition-colors text-espresso-deep hover:bg-surface-container"
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-paper-border/60 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href="/pesanan-saya"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container text-espresso-deep font-semibold text-sm border border-paper-border"
                >
                  <ShoppingBag className="w-4 h-4 text-terracotta" />
                  <span>Pesanan Anda</span>
                </Link>

                {user.role === "admin" && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-espresso-deep text-ivory-bright font-semibold text-sm"
                  >
                    <Shield className="w-4 h-4 text-terracotta" />
                    <span>Buka Dashboard Admin</span>
                  </Link>
                )}
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-paper-border text-espresso-deep font-semibold text-sm"
              >
                <User className="w-4 h-4 text-secondary" />
                <span>Masuk Akun</span>
              </Link>
            )}

            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-espresso-deep text-ivory-bright font-medium text-sm shadow-subtle"
            >
              <MessageCircle className="w-4 h-4 text-terracotta" />
              <span>Chat WhatsApp ({siteConfig.whatsappFormatted})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
