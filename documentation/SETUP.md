# Panduan Setup Lengkap & Database Google Spreadsheet - Abook Store

Dokumen ini memuat panduan lengkap menjalankan aplikasi, arsitektur integrasi Google Spreadsheet via Google Apps Script, konfigurasi environment, dan manajemen media.

---

## 1. Arsitektur Database Google Spreadsheet

Aplikasi menggunakan pola arsitektur aman berlapis:
```
Browser -> Next.js Server (API Route) -> Google Apps Script Web App -> Google Spreadsheet
```
> **Mengapa ada lapisan server Next.js?**
> Supaya browser tidak pernah memanggil Google Apps Script secara langsung dan spreadsheet tidak bisa diakses sembarang orang. Next.js dan Google Apps Script bertukar data menggunakan token rahasia bersama (`APPS_SCRIPT_SECRET`).

---

## 2. Langkah Setup Google Spreadsheet & Apps Script

### Langkah A: Buat Spreadsheet & Buka Editor
1. Buka [Google Sheets](https://sheets.new) di browser Anda dengan akun Google Anda.
2. Beri judul spreadsheet, misalnya: **"Database Abook Store"**.
3. Di bilah menu atas Google Sheets, klik **Ekstensi (Extensions)** > **Apps Script**.

### Langkah B: Masukkan File Kode
1. Di editor Apps Script, ganti nama file `Code.gs` atau buat file baru bernama `code.gs`. Salin seluruh isi file [code.gs](file:///c:/Users/User/Downloads/company%20profil/code.gs) dari root proyek dan tempelkan ke editor.
2. Klik tombol `+` di sebelah kiri editor > pilih **Script**, beri nama `setup.gs`. Salin seluruh isi file [setup.gs](file:///c:/Users/User/Downloads/company%20profil/setup.gs) dan tempelkan.

### Langkah C: Inisiasi Tabel Awal (Idempoten)
1. Pada dropdown fungsi di bagian atas editor Apps Script, pilih fungsi **`initTables`**.
2. Klik tombol **Run / Jalankan**.
3. Google akan meminta izin otorisasi akses spreadsheet pertama kali. Klik *Review Permissions* > Pilih akun Google Anda > *Advanced* > *Go to Untitled project (unsafe)* > *Allow*.
4. Periksa Google Spreadsheet Anda: Tiga sheet (`Roles`, `Users`, dan `News`) otomatis dibuat lengkap dengan header kolom dan akun administrator awal.

### Langkah D: Atur Script Properties (Kunci Rahasia)
1. Di menu sisi kiri Apps Script, klik ikon gerigi **Project Settings**.
2. Gulir ke bawah ke bagian **Script Properties**, klik **Add script property**.
   - **Property:** `APPS_SCRIPT_SECRET`
   - **Value:** `abook-store-apps-script-secret-2026` *(atau kode acak rahasia pilihan Anda)*
3. Klik **Save script properties**.

### Langkah E: Deploy sebagai Web App
1. Klik tombol biru **Deploy** di kanan atas > pilih **New deployment**.
2. Klik ikon gerigi *Select type* di kiri atas popup > pilih **Web app**.
3. Isi kolom:
   - **Description:** `Abook Store Production API`
   - **Execute as:** `Me` (email akun Google Anda)
   - **Who has access:** `Anyone` *(akses publik diizinkan karena setiap permintaan diverifikasi oleh token rahasia `APPS_SCRIPT_SECRET`)*
4. Klik **Deploy**.
5. Salin **Web app URL** yang muncul (formatnya: `https://script.google.com/macros/s/.../exec`).

### Langkah F: Sambungkan ke Proyek Next.js
Buka file `.env.local` di folder proyek lokal Anda, lalu isi:
```env
APPS_SCRIPT_URL="https://script.google.com/macros/s/DEPLOYMENT_ID_ANDA/exec"
APPS_SCRIPT_SECRET="abook-store-apps-script-secret-2026"
AUTH_SECRET="abook-store-super-secret-jwt-key-2026-safe"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

> **Catatan Pengujian Lokal Cepat:**
> Jika Anda belum sempat melakukan deploy Google Sheets di atas, sistem Next.js Abook Store telah dilengkapi **Database Fallback Lokal** otomatis. Anda sudah bisa langsung menguji login admin, pendaftaran akun baru, manajemen user, dan penulisan artikel di dashboard tanpa terblokir!

---

## 3. Akun Administrator Bawaan

Saat inisiasi pertama kali, sistem menyediakan akun admin awal:
- **Email:** `admin@gmail.com`
- **Kata Sandi:** `123456`

> ⚠️ **PERINGATAN KEAMANAN WAJIB:**
> Kredensial di atas bersifat publik untuk mempermudah pengujian awal. Sebelum aplikasi di-deploy ke Vercel atau dipublikasikan ke umum, Anda **wajib mengganti kata sandi admin** melalui menu **Ganti Sandi** yang tersedia di Dashboard Admin (`/dashboard`).

---

## 4. Catatan Penting Mengenai Penyimpanan Media (Upload Lokal vs Vercel)

- Saat ini thumbnail dan gambar yang diunggah disimpan di folder lokal `public/uploads/` melalui modul `src/lib/storage.ts`, dan hanya path-nya (`/uploads/...`) yang disimpan ke database.
- Pola ini bekerja sangat baik di lingkungan komputer sendiri (local development).
- **Karakteristik Vercel:** Disk server di Vercel bersifat *serverless & ephemeral* (sementara dan *read-only* saat runtime). File yang diunggah saat aplikasi sudah live di Vercel tidak akan bertahan lama saat kontainer me-restart.
- **Rencana Solusi:** Pada **Step 4**, kita dapat mengarahkan fungsi di `src/lib/storage.ts` ke penyimpanan cloud permanen (seperti Vercel Blob atau Cloudinary) dengan mudah tanpa perlu mengubah kode dashboard.

---

## 5. Cara Menjalankan & Memverifikasi

1. Jalankan development server:
   ```bash
   npm run dev
   ```
2. Atau jalankan versi produksi yang telah di-build:
   ```bash
   npm run build
   npm run start
   ```
3. Akses halaman:
   - **Landing Page:** [http://localhost:3000](http://localhost:3000)
   - **Login:** [http://localhost:3000/login](http://localhost:3000/login)
   - **Register:** [http://localhost:3000/register](http://localhost:3000/register)
   - **Dashboard Admin:** [http://localhost:3000/dashboard](http://localhost:3000/dashboard) *(memerlukan login admin)*
