import React from "react";
import { siteConfig } from "@/config/site";
import {
  BookOpen,
  Truck,
  Store,
  CheckCircle2,
  HeartHandshake,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function Services() {
  const iconMap: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen className="w-6 h-6 text-terracotta" />,
    Truck: <Truck className="w-6 h-6 text-terracotta" />,
    Store: <Store className="w-6 h-6 text-terracotta" />,
    SearchCheck: <CheckCircle2 className="w-6 h-6 text-terracotta" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-terracotta" />,
    Sparkles: <Sparkles className="w-6 h-6 text-terracotta" />,
  };

  return (
    <section id="layanan" className="py-20 md:py-24 bg-paper-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-terracotta"></span>
            <span className="font-sans text-xs uppercase tracking-widest text-secondary font-bold">
              LAYANAN & KEUNGGULAN
            </span>
            <span className="w-6 h-[2px] bg-terracotta"></span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-espresso-deep mb-4">
            Pengalaman Belanja Buku yang Lengkap & Terpercaya
          </h2>
          <p className="text-secondary text-sm sm:text-base leading-relaxed">
            Dari koleksi fiksi populer, literatur akademik, hingga pesanan khusus buku langka, kami hadir untuk memastikan setiap pembaca mendapatkan pelayanan terbaik.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {siteConfig.services.map((service, index) => (
            <div
              key={service.id}
              className="group relative p-7 rounded-2xl bg-surface-container-low border border-paper-border/80 hover:bg-surface-container hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-paper-canvas border border-paper-border flex items-center justify-center mb-6 shadow-subtle group-hover:scale-110 transition-transform duration-300">
                  {iconMap[service.icon] || <BookOpen className="w-6 h-6 text-terracotta" />}
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-espresso-deep mb-3 group-hover:text-terracotta transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-secondary text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Bottom Action Hint */}
              <div className="pt-4 border-t border-paper-border/40 flex items-center justify-between text-xs font-semibold text-espresso-deep">
                <span className="group-hover:text-terracotta transition-colors">
                  Layanan Resmi Abook
                </span>
                <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-1 group-hover:text-terracotta transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

