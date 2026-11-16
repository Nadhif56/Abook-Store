# Maintenance Log - Abook Store

## Backlog Fitur
- [ ] Integrasi Payment Gateway otomatis (Midtrans / Xendit) saat volume pesanan tinggi
- [ ] Notifikasi otomatis WhatsApp / Email saat pelanggan melakukan pemesanan dan saat admin mengonfirmasi
- [ ] Migrasi media upload ke Cloud Storage (Vercel Blob / Cloudinary) untuk persistensi media berita di production

## Bug Diketahui
*(Belum ada bug yang dilaporkan)*

## Riwayat Perubahan
- **16 November 2026**:
  - **Step 1 - Landing Page**: Rilis landing page beranda toko buku Abook Store (Hero, About, Layanan, Berita, Kontak & Embed Google Maps Bogor Timur). Semua 11 aset grafis dialihkan ke file lokal `public/images/`.
  - **Step 2 - User Management & Dashboard**: Rilis sistem otentikasi (JWT httpOnly, bcrypt hashing), role protection admin/user, Google Spreadsheet database adapter via Apps Script (`code.gs`, `setup.gs`), dan CMS Berita.
  - **Step 3 - Sistem Pemesanan & QRIS**: Rilis form pemesanan buku (`/pesan`), tiket pemesanan (`/pesanan/[id]/bayar`), barcode QRIS Abook Store, portal riwayat pelanggan (`/pesanan-saya`), dan tab manajemen pesanan di Dashboard Admin.
  - **Step 4 - Persiapan Deploy Vercel**: Penyusunan checklist deploy, berkas konfigurasi environment `.env.example`, `.gitignore`, dan dokumentasi pemeliharaan.
