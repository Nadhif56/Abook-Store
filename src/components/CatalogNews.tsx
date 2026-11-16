"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Search, Star, BookMarked, ArrowUpRight, MessageCircle, Calendar, User, ShoppingBag } from "lucide-react";

export function CatalogNews() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newsList, setNewsList] = useState<any[]>(siteConfig.news);

  // Ambil artikel berita published terkini dari database
  useEffect(() => {
    fetch("/api/news")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.news) && data.news.length > 0) {
          // Format data agar sesuai tampilan kartu
          const mapped = data.news.map((item: any) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            excerpt: item.excerpt,
            content: item.content,
            author: "Redaksi Abook",
            date: new Date(item.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            thumbnail: item.thumbnail_path || "/images/news-festival.svg",
            category: "Wawasan Toko",
          }));
          setNewsList(mapped);
        }
      })
      .catch(() => {
        // Tetap gunakan fallback dari siteConfig jika terjadi kendala jaringan
      });
  }, []);

  const categories = ["Semua", "Pengembangan Diri", "Fiksi", "Non-Fiksi", "Sastra", "Edukasi"];

  const filteredBooks = siteConfig.sampleBooks.filter((book) => {
    const matchesCategory =
      selectedCategory === "Semua" || book.category === selectedCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <>
      {/* SECTION: KATALOG BUKU PILIHAN */}
      <section id="katalog" className="py-20 bg-surface-container-low border-t border-paper-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] bg-terracotta"></span>
                <span className="font-sans text-xs uppercase tracking-widest text-secondary font-bold">
                  KATALOG UNGGULAN
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-espresso-deep">
                Pilihan Judul Favorit Pembaca
              </h2>
              <p className="text-secondary text-sm sm:text-base mt-2 max-w-xl">
                Temukan buku bacaan berkualitas mulai dari novel sastra, pengembangan diri terlaris, hingga literatur edukasi dengan harga ramah kantong.
              </p>
            </div>

            {/* Quick Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Cari judul buku atau penulis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-paper-canvas border border-paper-border text-sm text-espresso-deep placeholder:text-secondary/70 focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all shadow-subtle"
              />
              <Search className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-espresso-deep text-ivory-bright shadow-subtle"
                    : "bg-paper-canvas hover:bg-surface-container border border-paper-border text-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Book Cards Grid */}
          {filteredBooks.length === 0 ? (
            <div className="p-12 text-center bg-paper-canvas rounded-2xl border border-paper-border my-6">
              <BookMarked className="w-12 h-12 text-secondary/40 mx-auto mb-3" />
              <p className="font-serif font-bold text-lg text-espresso-deep">Buku tidak ditemukan</p>
              <p className="text-sm text-secondary mt-1">
                Silakan coba kata kunci lain atau hubungi admin kami untuk memesan judul khusus.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="group flex flex-col bg-paper-canvas rounded-2xl border border-paper-border/80 overflow-hidden hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Book Cover Container */}
                  <div className="relative aspect-[3/4] bg-surface-container overflow-hidden">
                    <img
                      src={book.coverImage}
                      alt={`Sampul buku ${book.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/book-filosofi-teras.svg";
                      }}
                    />
                    {book.isPopular && (
                      <span className="absolute top-2 left-2 bg-terracotta text-ivory-bright text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        Favorit
                      </span>
                    )}
                  </div>

                  {/* Book Details */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[10px] font-semibold text-secondary uppercase tracking-wider block mb-1">
                        {book.category}
                      </span>
                      <h3
                        className="font-serif font-bold text-xs sm:text-sm text-espresso-deep line-clamp-2 leading-snug group-hover:text-terracotta transition-colors"
                        title={book.title}
                      >
                        {book.title}
                      </h3>
                      <p className="text-[11px] text-secondary mt-1 line-clamp-1">
                        {book.author}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-paper-border/60">
                      <div className="flex items-center gap-1 text-amber-600 text-[11px] font-semibold mb-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{book.rating.toFixed(1)}</span>
                      </div>

                      <div className="flex items-baseline justify-between gap-1 flex-wrap">
                        <span className="text-xs sm:text-sm font-bold text-espresso-deep">
                          {formatRupiah(book.price)}
                        </span>
                        {book.originalPrice && (
                          <span className="text-[10px] text-secondary/70 line-through">
                            {formatRupiah(book.originalPrice)}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center gap-1.5">
                        <Link
                          href={`/pesan?bookId=${book.id}`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-espresso-deep hover:bg-olive-umber text-ivory-bright text-[11px] font-semibold transition-all shadow-subtle"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-terracotta" />
                          <span>Pesan</span>
                        </Link>
                        <a
                          href={`https://wa.me/${siteConfig.whatsapp}?text=Halo%20Abook%20Store%2C%20saya%20ingin%20bertanya%20tentang%20buku%20"${encodeURIComponent(
                            book.title
                          )}"`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Tanya via WhatsApp"
                          className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-espresso-deep transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-terracotta" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION: BERITA & WAWASAN LITERASI */}
      <section id="kabar" className="py-20 bg-paper-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] bg-terracotta"></span>
                <span className="font-sans text-xs uppercase tracking-widest text-secondary font-bold">
                  KABAR & RESENSI BUKU
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-espresso-deep">
                Catatan Redaksi & Wawasan Literasi
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-secondary font-medium">
              Terkoneksi langsung ke Database & Dashboard Admin
            </p>
          </div>

          {/* 3 Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsList.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col bg-surface-container-low border border-paper-border rounded-2xl overflow-hidden hover:shadow-card hover:-translate-y-1 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/news-festival.svg";
                    }}
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-paper-canvas/90 backdrop-blur-sm text-xs font-semibold text-espresso-deep border border-paper-border">
                    {item.category}
                  </span>
                </div>

                {/* Article Info */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-secondary mb-3">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-terracotta" />
                        {item.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-terracotta" />
                        {item.author}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base sm:text-lg text-espresso-deep leading-snug group-hover:text-terracotta transition-colors mb-2">
                      {item.title}
                    </h3>

                    <p className="text-secondary text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-paper-border/60 flex items-center justify-between text-xs font-semibold text-espresso-deep">
                    <span className="group-hover:text-terracotta transition-colors">
                      Baca Selengkapnya
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-secondary group-hover:text-terracotta group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
