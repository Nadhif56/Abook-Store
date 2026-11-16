"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  MessageCircle,
  ArrowRight,
  BookOpen,
  QrCode,
  Loader2,
  LogIn,
} from "lucide-react";

interface OrderTicket {
  id: string;
  book_id: string;
  book_title: string;
  quantity: number;
  price_per_unit: number;
  total_amount: number;
  recipient_name: string;
  phone: string;
  address: string;
  notes: string;
  status: "menunggu_konfirmasi" | "dikonfirmasi" | "dibatalkan";
  created_at: string;
}

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => {
        if (res.status === 401) {
          setIsUnauthorized(true);
          throw new Error("Unauthorized");
        }
        if (!res.ok) throw new Error("Gagal mengambil data pesanan.");
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-paper-canvas">
        <Navbar />
        <main className="flex-1 pt-24 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-secondary text-sm">
            <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
            <span>Memuat riwayat pesanan Anda...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isUnauthorized) {
    return (
      <div className="min-h-screen flex flex-col bg-paper-canvas">
        <Navbar />
        <main className="flex-1 pt-24 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-paper-subtle p-8 rounded-2xl border border-paper-border text-center space-y-4 shadow-subtle">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-terracotta mx-auto">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h2 className="font-serif font-bold text-xl text-espresso-deep">
              Masuk untuk Melihat Pesanan Anda
            </h2>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              Daftar tiket pesanan buku Anda tersimpan aman di akun Anda. Silakan masuk terlebih dahulu.
            </p>
            <div className="pt-2">
              <Link
                href="/login?redirect=/pesanan-saya"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-espresso-deep text-ivory-bright font-semibold text-xs sm:text-sm shadow-subtle"
              >
                <LogIn className="w-4 h-4 text-terracotta" />
                <span>Masuk Sekarang</span>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-paper-canvas">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] bg-terracotta"></span>
                <span className="font-sans text-xs uppercase tracking-widest text-secondary font-bold">
                  STATUS & RIWAYAT TIKET
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-deep">
                Pesanan Anda
              </h1>
              <p className="text-secondary text-xs sm:text-sm mt-1">
                Pantau status verifikasi pembayaran dan pengiriman buku yang telah Anda pesan.
              </p>
            </div>

            <Link
              href="/#katalog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-paper-border text-xs font-semibold text-espresso-deep transition-colors self-start sm:self-center"
            >
              <BookOpen className="w-4 h-4 text-terracotta" />
              <span>Beli Buku Lain</span>
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center bg-paper-subtle/50 rounded-2xl border border-paper-border space-y-4">
              <ShoppingBag className="w-12 h-12 text-secondary/40 mx-auto" />
              <h3 className="font-serif font-bold text-lg text-espresso-deep">
                Belum Ada Pesanan Buku
              </h3>
              <p className="text-xs sm:text-sm text-secondary max-w-sm mx-auto leading-relaxed">
                Anda belum pernah melakukan pemesanan buku di Abook Store. Pilih buku menarik di katalog kami sekarang!
              </p>
              <Link
                href="/#katalog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-espresso-deep text-ivory-bright font-semibold text-xs shadow-card"
              >
                <span>Jelajahi Katalog Pilihan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const isConfirmed = order.status === "dikonfirmasi";
                const isCancelled = order.status === "dibatalkan";
                const isPending = order.status === "menunggu_konfirmasi";

                const waMessage = encodeURIComponent(
                  `Halo Admin Abook Store, saya ingin menanyakan status pesanan saya dengan Kode Tiket #${order.id} (${order.book_title}).`
                );

                return (
                  <div
                    key={order.id}
                    className="p-6 rounded-2xl bg-paper-subtle/40 border border-paper-border shadow-subtle hover:shadow-card transition-all space-y-4"
                  >
                    {/* Header Tiket */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-paper-border/60 pb-3">
                      <div>
                        <span className="font-mono font-bold text-xs sm:text-sm text-espresso-deep block">
                          Tiket: #{order.id}
                        </span>
                        <span className="text-[11px] text-secondary">
                          Dibuat pada:{" "}
                          {new Date(order.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div>
                        {isPending && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Menunggu Konfirmasi</span>
                          </span>
                        )}
                        {isConfirmed && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Dikonfirmasi</span>
                          </span>
                        )}
                        {isCancelled && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Dibatalkan</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Informasi Status Box */}
                    {isConfirmed && (
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs leading-relaxed space-y-1">
                        <p className="font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          <span>Selamat, pembayaran Anda telah dikonfirmasi!</span>
                        </p>
                        <p>
                          Pesanan Anda sedang dikemas dengan rapi dan aman. Silakan tunggu informasi nomor resi pengiriman selanjutnya dari admin kami melalui WhatsApp/Email.
                        </p>
                      </div>
                    )}

                    {isPending && (
                      <div className="p-3.5 rounded-xl bg-surface-container-low border border-paper-border text-xs text-secondary flex items-start gap-2">
                        <Clock className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                        <span>
                          Pembayaran Anda sedang dalam antrean verifikasi manual oleh admin toko. Jika belum scan QRIS, silakan buka halaman pembayaran untuk menyelesaikan.
                        </span>
                      </div>
                    )}

                    {/* Rincian Produk */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                      <div>
                        <span className="text-secondary block mb-1">Judul Buku & Qty:</span>
                        <p className="font-serif font-bold text-sm text-espresso-deep">
                          {order.book_title}
                        </p>
                        <p className="text-secondary mt-0.5">
                          {order.quantity} eksemplar × {formatRupiah(order.price_per_unit)}
                        </p>
                      </div>

                      <div>
                        <span className="text-secondary block mb-1">Tujuan Pengiriman:</span>
                        <p className="font-semibold text-espresso-deep">
                          {order.recipient_name} ({order.phone})
                        </p>
                        <p className="text-secondary mt-0.5 line-clamp-2">
                          {order.address}
                        </p>
                      </div>
                    </div>

                    {/* Footer Tiket & Aksi */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-paper-border/60">
                      <div className="font-serif font-bold text-base text-espresso-deep">
                        <span>Total: </span>
                        <span className="text-terracotta">{formatRupiah(order.total_amount)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isPending && (
                          <Link
                            href={`/pesanan/${order.id}/bayar`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-paper-border bg-paper-canvas hover:bg-surface-container text-xs font-semibold text-espresso-deep transition-colors"
                          >
                            <QrCode className="w-3.5 h-3.5 text-terracotta" />
                            <span>Buka QRIS</span>
                          </Link>
                        )}

                        <a
                          href={`https://wa.me/${siteConfig.whatsapp}?text=${waMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-subtle transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Hubungi via WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
