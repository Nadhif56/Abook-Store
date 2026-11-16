import React from "react";
import { siteConfig } from "@/config/site";
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, ExternalLink } from "lucide-react";

export function ContactMaps() {
  return (
    <section id="kontak" className="py-20 bg-paper-subtle border-t border-paper-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[2px] bg-terracotta"></span>
            <span className="font-sans text-xs uppercase tracking-widest text-secondary font-bold">
              KUNJUNGI KAMI & HUBUNGI
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-espresso-deep mb-3">
            Lokasi Toko Fisik & Layanan Pelanggan
          </h2>
          <p className="text-secondary text-sm sm:text-base leading-relaxed">
            Kunjungi toko fisik kami di Bogor Timur untuk memilih buku secara santai, atau hubungi kontak kami untuk konsultasi dan pengiriman buku ke rumah Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-paper-canvas border border-paper-border shadow-subtle flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-terracotta shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-espresso-deep mb-1">
                  Alamat Gerai Toko
                </h3>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  {siteConfig.address}
                </p>
                <span className="inline-block mt-2 text-[11px] font-semibold text-terracotta bg-surface-container px-2.5 py-1 rounded-md">
                  Kawasan Cileungsi - Jonggol, Bogor Timur
                </span>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 rounded-2xl bg-paper-canvas border border-paper-border shadow-subtle flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-terracotta shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-espresso-deep mb-1">
                  Jam Operasional
                </h3>
                <p className="text-xs sm:text-sm text-secondary">
                  {siteConfig.openingHours}
                </p>
                <p className="text-xs text-emerald-700 font-medium mt-1">
                  Buka setiap hari, melayani toko fisik & order daring
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="p-6 rounded-2xl bg-espresso-deep text-ivory-bright shadow-card">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6 text-terracotta" />
                <h3 className="font-serif font-bold text-base">
                  Layanan Pesan Cepat via WhatsApp
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-ivory-bright/80 leading-relaxed mb-4">
                Punya pertanyaan ketersediaan stok buku, judul langka, atau ingin pesan cepat? Admin kami siap merespons dengan sigap.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Halo%20Abook%20Store%2C%20saya%20ingin%20bertanya%20mengenai%20koleksi%20buku`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white text-xs sm:text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat WhatsApp Sekarang</span>
                </a>
                <a
                  href={`tel:${siteConfig.whatsapp}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-olive-umber hover:bg-espresso-deep text-ivory-bright text-xs sm:text-sm font-semibold border border-paper-sand/20 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{siteConfig.whatsappFormatted}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Google Map */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="w-full rounded-2xl overflow-hidden border border-paper-border shadow-card bg-surface-container relative">
              {/* Map Header Bar */}
              <div className="px-5 py-3.5 bg-paper-canvas border-b border-paper-border flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-espresso-deep">
                  <Navigation className="w-4 h-4 text-terracotta" />
                  <span>Peta Navigasi Google Maps Resmi</span>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-secondary hover:text-terracotta font-medium"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Responsive Iframe Container */}
              <div className="relative w-full h-[380px] sm:h-[420px]">
                <iframe
                  title="Peta Lokasi Resmi Abook Store Bogor Timur"
                  src={siteConfig.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

