# Progres Proyek - Abook Store

Terakhir diperbarui: 16 November 2026  
Posisi saat ini: **Step 4 - Deploy & Maintenance**

## Checklist
- [x] Inisiasi (data usaha & konsep desain terkumpul)
- [x] STEP 1 - Landing page
  - [x] Inisialisasi Project (Next.js App Router + Tailwind CSS)
  - [x] Design Token & Tipografi (Warm Editorial / Literasi Bersih & Hangat)
  - [x] Navbar & Komponen Logo SVG (Inisial 'A' + Buku Terbuka)
  - [x] Hero Section (Headline, CTA, Badge Lokasi Bogor Timur, Statistik)
  - [x] About Section (Profil Abook Store Bogor Timur, Nilai Utama)
  - [x] Service / Keunggulan Layanan (6 Kartu Keunggulan Ritel & Online)
  - [x] Katalog Rekomendasi & Berita/Post (Pencarian interaktif, filter kategori, kartu artikel)
  - [x] Seluruh aset visual/gambar lokal (11/11 file lokal di `public/images/`, bebas 404/broken)
  - [x] Contact + Google Maps Embed (Bogor Timur / Cileungsi - Jonggol)
  - [x] Footer (Navigasi, Medsos, Hak Cipta)
  - [x] Responsif & aksesibilitas dicek (Mobile 375px, Tablet 768px, Desktop 1280px)
  - [x] Dikonfirmasi pengguna
- [x] STEP 2 - User management & dashboard
  - [x] Apps Script (`code.gs`, `setup.gs`) di root project + inisiasi tabel otomatis & idempoten
  - [x] Autentikasi Login & Register (validasi form, hashing password bcrypt, cookie JWT httpOnly)
  - [x] Sistem Role admin & user (role sistem terlindungi, proteksi rute middleware di server)
  - [x] Dashboard Admin (`/dashboard`):
    - [x] Manajemen User (daftar, cari, ubah role, aktif/nonaktif, proteksi akun admin mandiri & terakhir)
    - [x] Manajemen Role (daftar role, tambah role kustom, proteksi role sistem)
    - [x] CRUD Berita (tambah, edit, hapus, status draft/published, pratinjau, sinkron ke landing page)
    - [x] Fitur Ganti Kata Sandi Admin
  - [x] Upload Media Lokal (`/api/upload` via `src/lib/storage.ts` ke `public/uploads/`)
  - [x] QA & Pengujian Otomatis (login salah ditolak 401, login admin 200, proteksi user biasa 403, artikel baru langsung tayang)
  - [x] Dikonfirmasi pengguna
- [x] STEP 3 - Sistem Pemesanan & Pembayaran QRIS
  - [x] Tabel `Orders` pada database & Apps Script (`initTables()`)
  - [x] Alur Pemesanan Buku (Pilih buku, isi jumlah, data penerima, alamat pengiriman, WhatsApp, catatan)
  - [x] Halaman Tiket & Pembayaran QRIS (Total nominal, barcode QRIS toko, petunjuk transfer, unduh/salin kode tiket)
  - [x] Menu Navigasi "Pesanan Anda" (Riwayat tiket pelanggan berstatus: `menunggu_konfirmasi` -> `dikonfirmasi`)
  - [x] Manajemen Pesanan di Dashboard Admin (Konfirmasi pembayaran, tolak/batalkan pesanan, tombol WhatsApp langsung ke pembeli)
  - [x] Proteksi Server & Validasi Data Pesanan (Autentikasi sesi, isolasi akses per-user, validasi admin)
  - [x] QA & Pengujian E2E Otomatis Berhasil Lolos 100%
  - [x] Dikonfirmasi pengguna
- [ ] STEP 4 - Deploy & maintenance
  - [x] Persiapan Git & `.gitignore` (file rahasia `.env*`, `code.gs`, `setup.gs`, dan `public/uploads/*` terisolasi)
  - [x] Pembuatan log pemeliharaan (`documentation/MAINTENANCE.md`)
  - [ ] Push ke repository GitHub
  - [ ] Impor project di Vercel & isi Environment Variables
  - [ ] Deployment Google Apps Script Web App aktif
  - [ ] Verifikasi live website production
  - [ ] Ganti kata sandi admin default di production
  - [ ] Dikonfirmasi pengguna

## Catatan & Keputusan
- **Aset Gambar Lokal:** Semua foto dan sampul buku telah dialihkan ke file lokal beresolusi tinggi di `public/images/` dengan penamaan terstruktur (`hero-store.svg`, `about-store.svg`, `book-*.svg`, `news-*.svg`) sehingga dijamin selalu muncul tanpa ketergantungan jaringan eksternal.
- **Sistem Pemesanan Step 3:** Menyediakan sistem tiket pemesanan buku untuk pelanggan toko, pembayaran via scan QRIS resmi, validasi manual oleh admin sebelum paket buku dikirimkan, serta tombol pintas WhatsApp (`wa.me`) untuk komunikasi langsung.
- **Vercel Deploy Step 4:** Memanfaatkan Git + GitHub untuk auto-deploy ke Vercel. Konfigurasi `APPS_SCRIPT_URL`, `APPS_SCRIPT_SECRET`, dan `AUTH_SECRET` dimasukkan ke Vercel Environment Variables.
