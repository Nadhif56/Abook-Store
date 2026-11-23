"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BookOpen, Sparkles, MapPin, ArrowRight, Smartphone, BookMarked, ShieldCheck, Truck } from "lucide-react";

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      {/* Decorative Warm Background Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-surface-container/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-paper-subtle/70 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container border border-paper-border text-espresso-deep text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
              <span>Toko Buku Digital & Fisik • Bogor Timur (Cileungsi / Jonggol)</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso-deep leading-[1.18] tracking-tight mb-6">
              Jelajahi Ribuan E-Book Digital & Koleksi Buku Cetak Pilihan dengan{" "}
              <span className="text-terracotta relative inline-block underline decoration-paper-sand decoration-wavy decoration-1 underline-offset-8">
                Harga Terjangkau
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-secondary text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-light">
              Abook Store menghadirkan ekosistem literasi lengkap: jelajahi pratinjau (preview) resmi buku dari Google Books langsung di browser, atau pesan buku cetak fisik kurasi terbaik dengan pengiriman cepat ke seluruh Indonesia.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-12">
              <Link
                href="/ebooks"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-sm sm:text-base shadow-card transition-all duration-200 group"
              >
                <Smartphone className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Pratinjau Google Books</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-espresso-deep hover:bg-olive-umber text-ivory-bright font-semibold text-sm sm:text-base transition-colors duration-200"
              >
                <BookOpen className="w-5 h-5 text-terracotta" />
                <span>Beli Buku Cetak Fisik</span>
              </a>
            </div>

            {/* Metrics Strip */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-surface-container-low border border-paper-border/80 shadow-subtle">
              <div className="flex flex-col">
                <span className="font-serif text-2xl lg:text-3xl font-bold text-espresso-deep">
                  Google Books
                </span>
                <span className="text-xs text-secondary font-medium mt-0.5">
                  Pratinjau Digital Resmi
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl lg:text-3xl font-bold text-espresso-deep">
                  1.500+
                </span>
                <span className="text-xs text-secondary font-medium mt-0.5">
                  Judul Cetak Fisik
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl lg:text-3xl font-bold text-espresso-deep">
                  100%
                </span>
                <span className="text-xs text-secondary font-medium mt-0.5">
                  Buku Original
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl lg:text-3xl font-bold text-espresso-deep">
                  4.9/5
                </span>
                <span className="text-xs text-secondary font-medium mt-0.5">
                  Ulasan Pembaca
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Stacked Graphic Frame */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-paper-canvas bg-surface-container">
                <img
                  src="/images/hero-store.svg"
                  alt="Suasana rak buku estetik di toko buku Abook Store"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/hero-store.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-deep/80 via-espresso-deep/20 to-transparent" />

                {/* Floating Quote Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-paper-canvas/95 backdrop-blur-md border border-paper-border shadow-card">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-surface-container text-terracotta shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-serif italic text-xs sm:text-sm text-espresso-deep font-medium leading-snug">
                        “Buku adalah teman terbaik yang selalu menyajikan percakapan paling hening dan bermakna.”
                      </p>
                      <p className="text-[11px] font-sans text-secondary font-semibold uppercase tracking-wider mt-1.5">
                        — Filosofi Abook Store
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 bg-paper-canvas border border-paper-border px-3.5 py-2.5 rounded-xl shadow-card flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-espresso-deep">100% Original</div>
                  <div className="text-[10px] text-secondary">Kondisi Prima</div>
                </div>
              </div>

              {/* Floating Delivery Badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-paper-canvas border border-paper-border px-3.5 py-2.5 rounded-xl shadow-card flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-espresso-deep">Kirim Cepat</div>
                  <div className="text-[10px] text-secondary">Packing Berlapis Aman</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

