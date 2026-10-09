# 📖 Dokumentasi Deployment & Panduan Pengembang (Nahwu Shorof Academy)

## 1. Requirements & Prerequisites
- Node.js >= v18.17.0
- npm / pnpm / yarn
- Akun Supabase (Database PostgreSQL & Storage)
- Akun Vercel (Deployment)

---

## 2. Local Development Setup

1. **Clone repository**:
   ```bash
   git clone <repository-url>
   cd "Tata Bahasa Arab"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup environment variables**:
   Buat file `.env.local` berdasarkan contoh di `.env.example`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   ```

4. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

---

## 3. Environment Variables
Daftar variabel lingkungan yang dibutuhkan:

| Variable | Scope | Deskripsi |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public (Client/Server) | URL project Supabase Anda. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public (Client/Server) | Anon public API key Supabase. |

*Catatan: Jangan pernah menyimpan `SUPABASE_SERVICE_ROLE_KEY` pada client-side.*

---

## 4. Supabase Setup & Database Migration

1. **Buat Project Supabase Baru**:
   - Buka [Supabase Dashboard](https://database.new) dan buat project baru.
2. **Jalankan Migration SQL**:
   - Buka **SQL Editor** pada Supabase Dashboard.
   - Salin isi dari file [`supabase/migrations/20261007000000_init_schema.sql`](file:///c:/Users/lapto/Tata%20Bahasa%20Arab/supabase/migrations/20261007000000_init_schema.sql).
   - Jalankan query untuk membuat 19 entitas tabel, ENUM, Index, dan aturan RLS.
3. **Setup Supabase Storage Bucket**:
   - Masuk ke menu **Storage** → **Create Bucket**.
   - Beri nama bucket: `audios`.
   - Centang opsi **Public Bucket** agar file audio pelafalan dapat diakses aplikasi.

---

## 5. Seed Data Initial Testing

Untuk memasukkan kurikulum awal Nahwu, Shorof, audio, kuis, dan lencana:
- Buka **SQL Editor** pada Supabase Dashboard.
- Salin isi dari file [`supabase/seed.sql`](file:///c:/Users/lapto/Tata%20Bahasa%20Arab/supabase/seed.sql).
- Eksekusi query.

---

## 6. Admin Account Setup

Untuk mengubah role akun pengguna menjadi `admin`:
1. Mendaftar akun baru melalui form `/register` pada aplikasi.
2. Buka Supabase Dashboard → **Table Editor** → tabel `profiles`.
3. Cari baris akun pengguna tersebut, ubah kolom `role` dari `'user'` menjadi `'admin'`.
4. Akun tersebut kini dapat mengakses seluruh modul CMS di `/admin`.

---

## 7. Production Deployment (Vercel)

1. Connect repository GitHub ke Vercel Dashboard.
2. Tambahkan **Environment Variables** di Vercel settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Klik **Deploy**. Vercel akan otomatis menjalankan `npm run build` dan mempublikasikan aplikasi sebagai *Partial Prerender (PPR)* Next.js.
