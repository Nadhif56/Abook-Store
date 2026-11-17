"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  BookOpen,
  Search,
  Download,
  ExternalLink,
  ShoppingBag,
  Sparkles,
  Loader2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  BookMarked,
  Filter,
} from "lucide-react";

interface Ebook {
  id: number;
  title: string;
  author: string;
  cover: string;
  readUrl: string;
  downloadEpub: string;
  summary: string;
  category: string;
  downloadCount: number;
  physicalPrice: number;
}

const TOPIC_PRESETS = [
  { id: "all", label: "Semua Kategori" },
  { id: "fiction", label: "Sastra & Fiksi" },
  { id: "philosophy", label: "Filsafat & Pemikiran" },
  { id: "history", label: "Sejarah & Peradaban" },
  { id: "adventure", label: "Petualangan & Misteri" },
  { id: "science", label: "Sains & Teknologi" },
];

export default function EbooksPage() {
  const [books, setBooks] = useState<Ebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const fetchBooks = async (page: number, search: string, topic: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      if (search.trim()) params.set("search", search.trim());
      if (topic !== "all") params.set("topic", topic);

      const res = await fetch(`/api/ebooks?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setBooks(data.books || []);
        setTotalCount(data.count || 0);
        setHasNext(data.next);
        setHasPrev(data.previous);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error("Error loading ebooks:", err);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage, searchQuery, selectedTopic);
  }, [currentPage, selectedTopic]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBooks(1, searchQuery, selectedTopic);
  };

  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
    setCurrentPage(1);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  return (
    <div className="min-h-screen bg-paper-canvas text-on-surface flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Header Section */}
        <section className="bg-surface-container py-12 px-4 sm:px-6 lg:px-8 border-b border-paper-border/60">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper-canvas border border-paper-border text-terracotta text-xs font-bold uppercase tracking-wider mb-4 shadow-subtle">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Perpustakaan Digital Terbuka • 70.000+ Koleksi E-Book</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-espresso-deep tracking-tight mb-4 leading-tight">
              Koleksi E-Book Digital & Versi Cetak
            </h1>
            <p className="text-secondary text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Jelajahi karya sastra klasik, filsafat, dan pengetahuan dunia dari Project Gutenberg. Baca langsung di browser Anda secara gratis atau pesan edisi cetak fisiknya ke Abook Store.
            </p>

            {/* Search Box */}
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-2xl mx-auto relative flex items-center shadow-card rounded-2xl overflow-hidden bg-paper-canvas border border-paper-border focus-within:ring-2 focus-within:ring-terracotta"
            >
              <div className="pl-4 text-secondary">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul e-book atau nama penulis (contoh: Sherlock Holmes, Jane Austen, Dracula)..."
                className="w-full py-3.5 px-3 bg-transparent text-espresso-deep placeholder:text-secondary/60 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="m-1.5 px-5 py-2.5 rounded-xl bg-espresso-deep hover:bg-olive-umber text-ivory-bright font-semibold text-xs transition-colors shrink-0"
              >
                Cari Buku
              </button>
            </form>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <span className="text-xs font-bold text-secondary flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3" /> Topik:
              </span>
              {TOPIC_PRESETS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleTopicChange(t.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedTopic === t.id
                      ? "bg-terracotta text-white shadow-sm"
                      : "bg-paper-canvas border border-paper-border text-secondary hover:text-espresso-deep hover:border-espresso-deep/30"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-paper-border">
            <div>
              <h2 className="font-serif text-xl font-bold text-espresso-deep flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-terracotta" />
                <span>Katalog E-Book Digital</span>
              </h2>
              <p className="text-xs text-secondary mt-0.5">
                {totalCount > 0
                  ? `Ditemukan ${formatNumber(totalCount)} judul e-book siap baca`
                  : "Menampilkan koleksi e-book pilihan"}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-secondary">Halaman {currentPage}</span>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-secondary">
              <Loader2 className="w-8 h-8 animate-spin text-terracotta mb-3" />
              <p className="text-sm font-serif">Menghubungkan ke basis data e-book Gutendex...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="py-16 text-center max-w-md mx-auto p-6 rounded-2xl bg-paper-subtle border border-paper-border">
              <AlertCircle className="w-10 h-10 text-muted mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-espresso-deep mb-1">
                E-Book Tidak Ditemukan
              </h3>
              <p className="text-xs text-secondary mb-4">
                Tidak ada e-book yang cocok dengan pencarian &quot;{searchQuery}&quot;. Coba kata kunci lain atau pilih topik di atas.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTopic("all");
                  setCurrentPage(1);
                  fetchBooks(1, "", "all");
                }}
                className="px-4 py-2 rounded-xl bg-espresso-deep text-white text-xs font-semibold hover:bg-olive-umber transition-colors"
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            /* Books Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((b) => (
                <article
                  key={b.id}
                  className="bg-paper-canvas rounded-2xl border border-paper-border shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Cover Book Banner */}
                  <div className="relative aspect-[3/4] bg-surface-container overflow-hidden flex items-center justify-center border-b border-paper-border/60">
                    <img
                      src={
                        imageErrors[b.id]
                          ? "/images/book-bumi-manusia.svg"
                          : b.cover
                      }
                      alt={b.title}
                      onError={() =>
                        setImageErrors((prev) => ({ ...prev, [b.id]: true }))
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-espresso-deep/90 text-ivory-bright text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      {b.category}
                    </span>

                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-paper-canvas/90 text-secondary text-[10px] font-semibold backdrop-blur-sm flex items-center gap-1 border border-paper-border">
                      <Download className="w-2.5 h-2.5" />
                      <span>{formatNumber(b.downloadCount)} baca</span>
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-base text-espresso-deep line-clamp-2 group-hover:text-terracotta transition-colors mb-1 leading-snug">
                        {b.title}
                      </h3>
                      <p className="text-xs text-secondary font-medium mb-3">
                        Karya: <span className="text-espresso-deep font-semibold">{b.author}</span>
                      </p>
                      <p className="text-[11px] text-secondary/80 line-clamp-3 leading-relaxed mb-4">
                        {b.summary}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-3 border-t border-paper-border/60">
                      {/* Read Online Button */}
                      <a
                        href={b.readUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white text-xs font-bold transition-all shadow-sm"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Baca E-Book Online</span>
                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                      </a>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Download EPUB */}
                        <a
                          href={b.downloadEpub}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-surface-container hover:bg-paper-border/50 text-secondary text-[11px] font-semibold border border-paper-border transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          <span>Unduh EPUB</span>
                        </a>

                        {/* Order Physical Book */}
                        <Link
                          href={`/pesan?bookId=ebook-${b.id}&bookTitle=${encodeURIComponent(b.title)}&price=${b.physicalPrice}&cover=${encodeURIComponent(b.cover)}`}
                          className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-espresso-deep hover:bg-olive-umber text-ivory-bright text-[11px] font-semibold transition-colors shadow-sm"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Pesan Fisik</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && books.length > 0 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                disabled={!hasPrev || currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-4 py-2 rounded-xl border border-paper-border bg-paper-canvas text-xs font-semibold text-espresso-deep hover:bg-surface-container disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <span className="text-xs font-bold text-secondary px-3 py-1 rounded-lg bg-surface-container">
                Halaman {currentPage}
              </span>

              <button
                disabled={!hasNext}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-4 py-2 rounded-xl border border-paper-border bg-paper-canvas text-xs font-semibold text-espresso-deep hover:bg-surface-container disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
