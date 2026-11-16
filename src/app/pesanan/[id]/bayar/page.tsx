"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  QrCode,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageCircle,
  Copy,
  Receipt,
  AlertCircle,
  Loader2,
  FileText,
} from "lucide-react";

export default function PaymentQRISPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasPaidNotified, setHasPaidNotified] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil rincian pesanan.");
        return res.json();
      })
      .then((data) => {
        if (data.success && data.order) {
          setOrder(data.order);
        } else {
          throw new Error("Pesanan tidak ditemukan.");
        }
      })
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  }, [orderId]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const copyOrderId = () => {
    if (order?.id) {
      navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-paper-canvas">
        <Navbar />
        <main className="flex-1 pt-24 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-secondary text-sm">
            <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
            <span>Memuat informasi pembayaran...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (errorMessage || !order) {
    return (
      <div className="min-h-screen flex flex-col bg-paper-canvas">
        <Navbar />
        <main className="flex-1 pt-24 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-paper-subtle p-6 rounded-2xl border border-paper-border text-center space-y-4">
            <AlertCircle className="w-10 h-10 text-rose-600 mx-auto" />
            <h2 className="font-serif font-bold text-lg text-espresso-deep">
              {errorMessage || "Pesanan Tidak Ditemukan"}
            </h2>
            <p className="text-xs text-secondary">
              Pastikan Anda membuka pesanan dengan akun yang sesuai.
            </p>
            <Link
              href="/#katalog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-espresso-deep text-ivory-bright text-xs font-semibold"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const waText = encodeURIComponent(
    `Halo Admin Abook Store, saya sudah melakukan pembayaran via QRIS untuk pesanan:\n- Kode Tiket: ${order.id}\n- Judul Buku: ${order.book_title} (${order.quantity} pcs)\n- Total: ${formatRupiah(order.total_amount)}\n- Penerima: ${order.recipient_name}\nMohon konfirmasi dan proses pengirimannya ya. Terima kasih!`
  );

  return (
    <div className="min-h-screen flex flex-col bg-paper-canvas">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Banner Status */}
          <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shadow-subtle flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <p className="text-xs sm:text-sm font-bold">
                Tiket Pesanan Dibuat: Menunggu Pembayaran
              </p>
              <p className="text-xs text-amber-800 mt-0.5">
                Silakan scan barcode QRIS di bawah ini dengan aplikasi perbankan atau dompet digital Anda. Pesanan akan otomatis tercatat di menu <strong>Pesanan Anda</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Kolom Kiri: QRIS & Langkah Pembayaran */}
            <div className="md:col-span-6 flex flex-col items-center bg-paper-subtle/50 p-6 rounded-2xl border border-paper-border shadow-subtle">
              <div className="flex items-center gap-2 mb-4">
                <QrCode className="w-5 h-5 text-terracotta" />
                <h3 className="font-serif font-bold text-base text-espresso-deep">
                  Scan QRIS Pembayaran
                </h3>
              </div>

              {/* QRIS SVG Image */}
              <div className="w-full max-w-[320px] rounded-2xl overflow-hidden shadow-card border-2 border-paper-border bg-white p-2">
                <img
                  src="/images/qris-abookstore.svg"
                  alt="QRIS Abook Store"
                  className="w-full h-auto"
                />
              </div>

              <div className="w-full mt-6 space-y-2.5 text-xs text-secondary">
                <div className="font-semibold text-espresso-deep text-xs border-b border-paper-border/60 pb-1.5">
                  Langkah Pembayaran:
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-surface-container text-espresso-deep font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </span>
                  <span>Buka aplikasi m-Banking (BCA, Mandiri, BRI, BNI) atau E-Wallet (GoPay, OVO, Dana, ShopeePay).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-surface-container text-espresso-deep font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </span>
                  <span>Pindai (scan) kode QRIS di atas dan pastikan nama penerima: <strong>Abook Store</strong>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-surface-container text-espresso-deep font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </span>
                  <span>Masukkan nominal tepat: <strong>{formatRupiah(order.total_amount)}</strong>.</span>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Rincian Tiket Pesanan */}
            <div className="md:col-span-6 space-y-6">
              <div className="bg-paper-canvas p-6 sm:p-7 rounded-2xl border border-paper-border shadow-card space-y-5">
                <div className="flex items-center justify-between border-b border-paper-border/60 pb-3">
                  <h3 className="font-serif font-bold text-base text-espresso-deep flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-terracotta" />
                    <span>Rincian Tiket Pesanan</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                    Menunggu Konfirmasi
                  </span>
                </div>

                {/* Kode Tiket */}
                <div className="p-3.5 rounded-xl bg-surface-container-low border border-paper-border/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-secondary block">
                      Kode Tiket Pesanan
                    </span>
                    <span className="font-mono font-bold text-sm text-espresso-deep">
                      {order.id}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={copyOrderId}
                    className="p-2 rounded-lg text-secondary hover:text-espresso-deep hover:bg-surface-container transition-colors"
                    title="Salin Kode Tiket"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {copied && (
                  <p className="text-[11px] text-emerald-600 font-semibold -mt-3">
                    Kode tiket berhasil disalin ke papan klip!
                  </p>
                )}

                {/* Info Pesanan */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-paper-border/40">
                    <span className="text-secondary">Judul Buku:</span>
                    <span className="font-serif font-bold text-espresso-deep text-right max-w-[200px]">
                      {order.book_title}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-paper-border/40">
                    <span className="text-secondary">Jumlah Eksemplar:</span>
                    <span className="font-semibold text-espresso-deep">
                      {order.quantity} pcs
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-paper-border/40">
                    <span className="text-secondary">Penerima Paket:</span>
                    <span className="font-semibold text-espresso-deep">
                      {order.recipient_name} ({order.phone})
                    </span>
                  </div>
                  <div className="py-1.5 border-b border-paper-border/40">
                    <span className="text-secondary block mb-1">Alamat Pengiriman:</span>
                    <span className="font-medium text-espresso-deep leading-relaxed">
                      {order.address}
                    </span>
                  </div>

                  <div className="flex justify-between font-serif font-bold text-base text-espresso-deep pt-2">
                    <span>Total Tagihan:</span>
                    <span className="text-terracotta text-lg font-bold">
                      {formatRupiah(order.total_amount)}
                    </span>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="pt-4 border-t border-paper-border space-y-3">
                  {!hasPaidNotified ? (
                    <button
                      type="button"
                      onClick={() => setHasPaidNotified(true)}
                      className="w-full py-3 px-4 rounded-xl bg-espresso-deep hover:bg-olive-umber text-ivory-bright font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-card transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4 text-terracotta" />
                      <span>Saya Sudah Melakukan Pembayaran</span>
                    </button>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>
                        Terima kasih! Pesanan Anda telah tersimpan dengan status <strong>Menunggu Konfirmasi</strong>.
                      </span>
                    </div>
                  )}

                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-subtle transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Konfirmasi Cepat via WhatsApp</span>
                  </a>

                  <Link
                    href="/pesanan-saya"
                    className="w-full py-2.5 px-4 rounded-xl border border-paper-border hover:bg-surface-container text-espresso-deep font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-secondary" />
                    <span>Buka Menu &ldquo;Pesanan Anda&rdquo;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
