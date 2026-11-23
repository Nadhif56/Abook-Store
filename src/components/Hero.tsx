"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  BookOpen,
  Sparkles,
  MapPin,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from "lucide-react";

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
              <span>Toko Buku Kurasi & Literasi Pilihan • Bogor Timur</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-espresso-deep leading-[1.18] tracking-tight mb-6">
              Koleksi Buku Berkualitas & Bestseller dengan{" "}
              <span className="text-terracotta relative inline-block underline decoration-paper-sand decoration-wavy decoration-1 underline-offset-8">
                Harga Terjangkau
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-secondary text-base sm:text-lg leading-relaxed mb-8 max-w-2xl font-light">
              Abook Store menyediakan ribuan judul buku cetak pilihan—mulai dari novel fiksi, non-fiksi, pengembangan diri, bisnis, hingga buku edukasi kuliah. Dapatkan buku bacaan original dengan harga ramah kantong dan pengiriman cepat ke seluruh Indonesia.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-12">
              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-semibold text-sm sm:text-base shadow-card transition-all duration-200 group"
              >
                <BookOpen className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Lihat Katalog Buku</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=Halo%20Abook%20Store%2C%20saya%20ingin%20bertanya%20katalog%20buku`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-espresso-deep hover:bg-olive-umber text-ivory-bright font-semibold text-sm sm:text-base transition-colors duration-200"
              >
                <MessageCircle className="w-5 h-5 text-terracotta" />
                <span>Chat WhatsApp Toko</span>
              </a>
            </div>

            {/* Metrics Strip */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-surface-container-low border border-paper-border/80 shadow-subtle">
              <div className="flex flex-col">
                <span className="font-serif text-2xl lg:text-3xl font-bold text-espresso-deep">
                  24+
                </span>
                <span className="text-xs text-secondary font-medium mt-0.5">
                  Judul Kurasi Bestseller
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl lg:text-3xl font-bold text-espresso-deep">
                  100%
                </span>
                <span className="text-xs text-secondary font-medium mt-0.5">
                  Buku Asli & Terjamin
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl lg:text-3xl font-bold text-espresso-deep">
                  Rp 45rb+
                </span>
                <span className="text-xs text-secondary font-medium mt-0.5">
                  Harga Sangat Terjangkau
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl lg:text-3xl font-bold text-espresso-deep">
                  4.9 / 5
                </span>
                <span className="text-xs text-secondary font-medium mt-0.5">
                  Ulasan Pembaca Puas
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Store Graphic Container */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-card border border-paper-border bg-paper-canvas p-3">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-surface-container relative">
                  <img
                    src="/images/hero-store.svg"
                    alt="Suasana Toko Buku Abook Store Bogor Timur"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-deep/30 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Badge 1: Location */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-paper-canvas/95 backdrop-blur-md p-4 rounded-2xl shadow-card border border-paper-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-secondary font-bold">
                    Lokasi Toko
                  </p>
                  <p className="text-xs font-serif font-bold text-espresso-deep">
                    Bogor Timur (Cileungsi / Jonggol)
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: Delivery */}
              <div className="absolute -top-6 -right-6 z-20 bg-paper-canvas/95 backdrop-blur-md p-4 rounded-2xl shadow-card border border-paper-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-secondary font-bold">
                    Pengiriman
                  </p>
                  <p className="text-xs font-serif font-bold text-espresso-deep">
                    Siap Kirim ke Seluruh Indonesia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
