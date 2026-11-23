"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { siteConfig, BookItem } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  BookOpen,
  ArrowLeft,
  User,
  Phone,
  MapPin,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LogIn,
} from "lucide-react";

function OrderFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialBookId = searchParams.get("bookId") || siteConfig.sampleBooks[0].id;
  const queryTitle = searchParams.get("bookTitle");
  const queryPrice = searchParams.get("price");
  const queryCover = searchParams.get("cover");

  // Jika dipesan dengan judul khusus atau dari daftar buku toko
  const customBook = queryTitle
    ? {
        id: initialBookId,
        title: queryTitle,
        category: "Koleksi Pilihan",
        author: "Penulis Buku",
        price: queryPrice ? parseInt(queryPrice, 10) : 65000,
        coverImage: queryCover || "/images/book-bumi-manusia.svg",
        synopsis: `Pemesanan buku '${queryTitle}' di Abook Store.`,
      }
    : null;

  const allAvailableBooks = customBook
    ? [customBook, ...siteConfig.sampleBooks]
    : siteConfig.sampleBooks;

  const [selectedBookId, setSelectedBookId] = useState(initialBookId);
  const [quantity, setQuantity] = useState(1);
  const [recipientName, setRecipientName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Cek user session
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data.user) {
          setCurrentUser(data.user);
          setRecipientName(data.user.name || "");
        } else {
          setCurrentUser(null);
        }
      })
      .catch(() => setCurrentUser(null))
      .finally(() => setIsCheckingAuth(false));
  }, []);

  const selectedBook =
    allAvailableBooks.find((b) => b.id === selectedBookId) ||
    allAvailableBooks[0];

  const totalAmount = selectedBook.price * quantity;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!currentUser) {
      router.push(`/login?redirect=/pesan?bookId=${selectedBookId}`);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book_id: selectedBook.id,
          book_title: selectedBook.title,
          price_per_unit: selectedBook.price,
          quantity,
          recipient_name: recipientName,
          phone,
          address,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat pesanan.");
      }

      // Alihkan langsung ke halaman pembayaran QRIS
      router.push(`/pesanan/${data.order.id}/bayar`);
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <Link
        href="/#katalog"
        className="inline-flex items-center gap-2 text-xs font-semibold text-secondary hover:text-espresso-deep mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Katalog Buku</span>
      </Link>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="w-6 h-[2px] bg-terracotta"></span>
          <span className="font-sans text-xs uppercase tracking-widest text-secondary font-bold">
            PEMESANAN RESMI
          </span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-deep">
          Formulir Pemesanan Buku & Pengiriman
        </h1>
        <p className="text-secondary text-xs sm:text-sm mt-1">
          Lengkapi data penerima dan alamat pengiriman Anda dengan benar untuk memudahkan kurir mengantarkan buku.
        </p>
      </div>

      {/* Alert jika belum login */}
      {!isCheckingAuth && !currentUser && (
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm font-bold">
                Masuk untuk Melanjutkan Pemesanan
              </p>
              <p className="text-xs text-amber-800 mt-0.5">
                Anda perlu masuk ke akun terlebih dahulu agar tiket pesanan dan nomor resi pengiriman dapat tersimpan di menu <strong>Pesanan Anda</strong>.
              </p>
            </div>
          </div>
          <Link
            href={`/login?redirect=/pesan?bookId=${selectedBookId}`}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-sm self-start sm:self-center"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Masuk Akun</span>
          </Link>
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Kolom Kiri: Detail Buku & Qty */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-paper-subtle/50 p-6 rounded-2xl border border-paper-border shadow-subtle space-y-5">
            <h3 className="font-serif font-bold text-base text-espresso-deep border-b border-paper-border/60 pb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-terracotta" />
              <span>Buku yang Dipesan</span>
            </h3>

            {/* Dropdown Pemilihan Buku */}
            <div>
              <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
                Pilih Judul Buku
              </label>
              <select
                value={selectedBookId}
                onChange={(e) => setSelectedBookId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-paper-border bg-paper-canvas text-xs sm:text-sm font-semibold text-espresso-deep focus:outline-none focus:ring-2 focus:ring-terracotta"
              >
                {allAvailableBooks.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title} — {formatRupiah(b.price)}
                  </option>
                ))}
              </select>
            </div>

            {/* Visual Kartu Buku */}
            <div className="flex gap-4 p-3.5 rounded-xl bg-paper-canvas border border-paper-border/80">
              <div className="w-20 aspect-[3/4] rounded-lg overflow-hidden shrink-0 bg-surface-container border border-paper-border">
                <img
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-terracotta uppercase">
                    {selectedBook.category}
                  </span>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-espresso-deep line-clamp-2 leading-snug">
                    {selectedBook.title}
                  </h4>
                  <p className="text-[11px] text-secondary mt-0.5">
                    {selectedBook.author}
                  </p>
                </div>
                <div className="font-bold text-espresso-deep text-sm">
                  {formatRupiah(selectedBook.price)}
                </div>
              </div>
            </div>

            {/* Counter Jumlah Eksemplar */}
            <div>
              <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">
                Jumlah Eksemplar (Qty)
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high border border-paper-border text-espresso-deep font-bold text-base flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <span className="font-serif font-bold text-base text-espresso-deep w-10 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high border border-paper-border text-espresso-deep font-bold text-base flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Ringkasan Subtotal */}
            <div className="pt-4 border-t border-paper-border/60 space-y-2 text-xs">
              <div className="flex justify-between text-secondary">
                <span>Harga Satuan:</span>
                <span>{formatRupiah(selectedBook.price)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Jumlah:</span>
                <span>{quantity} buku</span>
              </div>
              <div className="flex justify-between font-serif font-bold text-sm sm:text-base text-espresso-deep pt-2 border-t border-dashed border-paper-border">
                <span>Total Pembayaran:</span>
                <span className="text-terracotta">{formatRupiah(totalAmount)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low border border-paper-border text-xs text-secondary space-y-1.5">
            <div className="font-semibold text-espresso-deep flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Garansi Buku 100% Asli</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Pengemasan menggunakan bubble wrap tebal dan kardus pengaman agar pesanan Anda sampai dalam kondisi sempurna.
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Data Pengiriman */}
        <div className="md:col-span-7 bg-paper-subtle/40 p-6 sm:p-8 rounded-2xl border border-paper-border shadow-subtle space-y-5">
          <h3 className="font-serif font-bold text-base text-espresso-deep border-b border-paper-border/60 pb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-terracotta" />
            <span>Informasi Pengiriman</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-espresso-deep uppercase tracking-wider mb-1.5">
              Nama Lengkap Penerima *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Contoh: Siti Rahmawati"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-paper-border bg-paper-canvas text-xs sm:text-sm text-espresso-deep focus:outline-none focus:ring-2 focus:ring-terracotta"
              />
              <User className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-espresso-deep uppercase tracking-wider mb-1.5">
              Nomor WhatsApp Aktif *
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-paper-border bg-paper-canvas text-xs sm:text-sm text-espresso-deep focus:outline-none focus:ring-2 focus:ring-terracotta"
              />
              <Phone className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[11px] text-secondary mt-1">
              Admin toko akan menghubungi nomor ini untuk mengonfirmasi resi pengiriman.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-espresso-deep uppercase tracking-wider mb-1.5">
              Alamat Lengkap Pengiriman *
            </label>
            <textarea
              rows={3}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Jl. Mawar No. 12, RT 02 / RW 05, Kel. Pasir Angin, Kec. Cileungsi, Kab. Bogor, Jawa Barat 16820"
              className="w-full px-3.5 py-2.5 rounded-xl border border-paper-border bg-paper-canvas text-xs sm:text-sm text-espresso-deep focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-espresso-deep uppercase tracking-wider mb-1.5">
              Catatan Khusus (Opsional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Tolong bungkus kado, atau titipkan di pos satpam bila tidak ada orang di rumah."
              className="w-full px-3.5 py-2.5 rounded-xl border border-paper-border bg-paper-canvas text-xs sm:text-sm text-espresso-deep focus:outline-none focus:ring-2 focus:ring-terracotta"
            />
          </div>

          <div className="pt-4 border-t border-paper-border/60">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-espresso-deep hover:bg-olive-umber text-ivory-bright font-semibold text-sm shadow-card flex items-center justify-center gap-2 transition-all disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-terracotta" />
                  <span>Membuat Tiket Pesanan...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-terracotta" />
                  <span>Lanjut ke Pembayaran QRIS ({formatRupiah(totalAmount)})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function OrderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-paper-canvas">
      <Navbar />
      <main className="flex-1 pt-20">
        <Suspense fallback={<div className="p-12 text-center text-sm">Memuat form pemesanan...</div>}>
          <OrderFormContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
