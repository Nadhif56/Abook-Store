import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { Heart, MapPin, Phone, Mail, Instagram, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-espresso-deep text-ivory-bright pt-16 pb-12 border-t border-paper-sand/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-paper-sand/20">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Logo size="lg" className="text-ivory-bright" />
            <p className="text-secondary text-sm leading-relaxed max-w-sm mt-3 font-light text-paper-sand">
              {siteConfig.description}
            </p>
            <div className="pt-2 text-xs text-paper-muted">
              Pilihan Utama Pencinta Buku di Kawasan Bogor Timur (Cileungsi / Jonggol).
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-base text-ivory-bright mb-4">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-sm text-paper-sand">
              <li>
                <a href="#beranda" className="hover:text-terracotta transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-terracotta transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-terracotta transition-colors">
                  Keunggulan Layanan
                </a>
              </li>
              <li>
                <a href="#katalog" className="hover:text-terracotta transition-colors">
                  Katalog Buku Pilihan
                </a>
              </li>
              <li>
                <a href="#kabar" className="hover:text-terracotta transition-colors">
                  Kabar & Resensi Redaksi
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-terracotta transition-colors">
                  Lokasi & Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-base text-ivory-bright mb-4">
              Hubungi Toko
            </h4>
            <div className="space-y-3 text-sm text-paper-sand">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-terracotta shrink-0 mt-1" />
                <span>{siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-terracotta shrink-0" />
                <span>WhatsApp: {siteConfig.whatsappFormatted}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-terracotta shrink-0" />
                <span>Email: {siteConfig.email}</span>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-xs uppercase tracking-wider text-paper-sand font-semibold mb-2">
                Temukan Kami di Marketplace & Medsos
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-surface-container/20 hover:bg-terracotta text-ivory-bright transition-colors"
                  aria-label="Instagram Abook Store"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.socials.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-surface-container/20 hover:bg-terracotta text-ivory-bright text-xs font-medium transition-colors"
                >
                  Shopee
                </a>
                <a
                  href={siteConfig.socials.tokopedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-surface-container/20 hover:bg-terracotta text-ivory-bright text-xs font-medium transition-colors"
                >
                  Tokopedia
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-paper-sand">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Seluruh Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-1 text-paper-muted">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-terracotta fill-terracotta" />
            <span>untuk literasi Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

