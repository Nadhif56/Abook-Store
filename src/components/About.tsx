"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { Heart, Compass, BookmarkCheck, Users, MapPin } from "lucide-react";

export function About() {
  const values = [
    {
      icon: Compass,
      title: "Kurasi Teliti & Berkualitas",
      desc: "Setiap judul dipilih dengan cermat—mulai dari fiksi berkelas, non-fiksi berbobot, hingga buku inspiratif yang memberi nilai tambah bagi pembaca.",
    },
    {
      icon: BookmarkCheck,
      title: "Akses Buku Terjangkau",
      desc: "Kami percaya membaca tidak boleh terhalang harga mahal. Abook Store berkomitmen memberikan harga paling ramah di kantong pembaca.",
    },
    {
      icon: MapPin,
      title: "Pusat Literasi Bogor Timur",
      desc: "Menjadi wadah bersahabat bagi warga Cileungsi, Jonggol, Cibubur, dan sekitarnya untuk menemukan buku favorit secara langsung maupun daring.",
    },
    {
      icon: Users,
      title: "Pelayanan Hangat & Ramah",
      desc: "Bagi kami, pembaca adalah sahabat literasi. Kami melayani setiap pertanyaan, konsultasi judul, hingga pesanan dengan penuh ketulusan.",
    },
  ];

  return (
    <section id="tentang" className="py-20 bg-paper-subtle border-y border-paper-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual collage */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-card border border-paper-border bg-surface-container aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/images/about-store.svg"
                  alt="Interior membaca dan buku di Abook Store"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/about-store.svg";
                  }}
                />
              </div>

              {/* Overlapping small card */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 w-3/4 p-4 sm:p-5 rounded-2xl bg-paper-canvas border border-paper-border shadow-hover">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-terracotta shrink-0">
                    <Heart className="w-5 h-5 fill-terracotta/20" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm sm:text-base text-espresso-deep">
                      Didirikan dengan Cinta Literasi
                    </h4>
                    <p className="text-xs text-secondary mt-0.5">
                      Dedikasi untuk memperkaya wawasan nusantara.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] bg-terracotta"></span>
              <span className="font-sans text-xs uppercase tracking-widest text-secondary font-bold">
                TENTANG ABOOK STORE
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-espresso-deep leading-tight mb-6">
              Mendekatkan Lembaran Inspirasi ke Setiap Sudut Rumah Anda
            </h2>

            <div className="space-y-4 text-secondary text-sm sm:text-base leading-relaxed mb-8">
              <p>
                <strong>Abook Store</strong> lahir dari kerinduan sederhana: menghadirkan akses buku yang lengkap, bermutu, dan bersahabat tanpa harus menempuh jarak jauh ke pusat ibu kota. Berpusat di kawasan berkembang Bogor Timur (Cileungsi / Jonggol), kami hadir sebagai ruang bertemunya para pencari wawasan.
              </p>
              <p>
                Kami menyadari bahwa setiap lembar buku menyimpan potensi mengubah cara pandang seseorang. Oleh karenanya, kami tidak hanya menjual buku fisik di gerai, melainkan juga melayani pesanan online yang menjangkau seluruh pelosok Indonesia dengan standar pengemasan terbaik dan kecepatan respons yang dapat diandalkan.
              </p>
            </div>

            {/* Core Values 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, i) => {
                const IconComponent = v.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-paper-canvas border border-paper-border/80 shadow-subtle hover:border-terracotta/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-surface-container text-terracotta shrink-0 mt-0.5">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-espresso-deep mb-1">
                          {v.title}
                        </h4>
                        <p className="text-xs text-secondary leading-normal">
                          {v.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

