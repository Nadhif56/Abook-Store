# Progres Proyek - Abook Store

Terakhir diperbarui: 17 November 2026  
Posisi saat ini: **Step 4 - Toko Buku Hybrid (Digital Gutendex & Fisik) Selesai**

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
- [x] FITUR TOKO BUKU MURNI - Katalog Lengkap & Mandiri (Bebas Ketergantungan API Luar)
  - [x] Pembersihan total seluruh dependensi pihak ketiga (Gutendex & Google Books API)
  - [x] Katalog 24+ judul buku terlaris & kurasi berkualitas di `src/config/site.ts`
  - [x] Filter kategori buku lengkap (Pengembangan Diri, Sastra & Fiksi, Non-Fiksi & Sejarah, Bisnis, Agama, Edukasi)
  - [x] Pencarian langsung (live search) responsif berdasarkan judul, penulis, dan deskripsi
  - [x] Alur checkout langsung via QRIS (`/pesan`) dan WhatsApp direct order
  - [x] Banner layanan "Titip Cari Buku" via WhatsApp untuk judul buku khusus
  - [x] Integrasi Google OAuth 2.0 Akun Resmi (Google Cloud Client ID & Secret)
  - [x] Pembaruan Nomor Resmi WhatsApp & Telepon Toko (`082312633697`)
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
- **Toko Buku Hybrid:** Pengunjung dapat membaca atau mengunduh puluhan ribu e-book digital gratis dari Gutendex (Project Gutenberg), sekaligus dapat memesan buku cetak fisik kurasi toko atau versi cetak dari e-book yang disukai melalui sistem tiket & QRIS Abook Store.
- **Google OAuth 2.0 Asli:** Terhubung langsung ke `accounts.google.com` menggunakan Google Client ID resmi (`516627881470-gt09uk5nubkecqll0m51korbuqv7djdn.apps.googleusercontent.com`).
- **Aset Gambar Lokal:** Semua foto dan sampul buku telah dialihkan ke file lokal beresolusi tinggi di `public/images/`.
