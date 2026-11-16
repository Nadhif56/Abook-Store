import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createOrder, getOrders } from "@/lib/db";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

// GET: Ambil daftar pesanan milik pengguna yang sedang login
export async function GET() {
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json(
      { error: "Sesi login diperlukan untuk melihat daftar pesanan Anda." },
      { status: 401 }
    );
  }

  const myOrders = await getOrders(session.id);
  return NextResponse.json({ success: true, orders: myOrders });
}

// POST: Buat pesanan baru
export async function POST(request: Request) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json(
        { error: "Silakan masuk ke akun Anda terlebih dahulu untuk melakukan pemesanan." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { book_id, quantity, recipient_name, phone, address, notes } = body;

    // Validasi input
    if (!book_id) {
      return NextResponse.json({ error: "Buku yang dipesan wajib dipilih." }, { status: 400 });
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      return NextResponse.json({ error: "Jumlah buku minimal 1 eksemplar." }, { status: 400 });
    }

    if (!recipient_name || recipient_name.trim().length < 2) {
      return NextResponse.json({ error: "Nama lengkap penerima wajib diisi." }, { status: 400 });
    }

    const cleanedPhone = (phone || "").replace(/[^0-9+]/g, "");
    if (cleanedPhone.length < 8) {
      return NextResponse.json(
        { error: "Nomor WhatsApp penerima tidak valid (minimal 8 digit)." },
        { status: 400 }
      );
    }

    if (!address || address.trim().length < 10) {
      return NextResponse.json(
        { error: "Alamat pengiriman harus lengkap (nama jalan, nomor rumah, kecamatan, kota, kode pos)." },
        { status: 400 }
      );
    }

    // Cari data buku dari katalog
    const targetBook = siteConfig.sampleBooks.find((b) => b.id === book_id);
    const bookTitle = targetBook ? targetBook.title : "Buku Pilihan";
    const pricePerUnit = targetBook ? targetBook.price : 50000;
    const totalAmount = pricePerUnit * qty;

    const newOrder = await createOrder({
      user_id: session.id,
      book_id,
      book_title: bookTitle,
      quantity: qty,
      price_per_unit: pricePerUnit,
      total_amount: totalAmount,
      recipient_name: recipient_name.trim(),
      phone: cleanedPhone,
      address: address.trim(),
      notes: (notes || "").trim(),
    });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Gagal memproses pembuatan pesanan." },
      { status: 500 }
    );
  }
}
