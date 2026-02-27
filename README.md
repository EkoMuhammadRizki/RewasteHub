# 🌿 Rumah Sampah Digital — RewasteHub Cisereuh

> Platform pengelolaan sampah digital untuk Kelurahan Ciseureuh. Dibangun sebagai bagian dari program **PPK ORMAWA PGSD**.

---

## 📖 Tentang Aplikasi

**Rumah Sampah Digital** adalah aplikasi web yang membantu warga Kelurahan Ciseureuh mengelola sampah secara lebih cerdas dan terdigitalisasi. Pengguna dapat menyetorkan sampah ke bank sampah digital, mendapatkan poin reward, belajar tentang pengelolaan lingkungan, serta memantau aktivitas pengolahan sampah organik — semuanya dalam satu platform.

---

## ✨ Fitur Utama

### 🔐 Autentikasi
- **Halaman Login** (`/auth/login`) — Masuk menggunakan email & password dengan validasi form.
- **Halaman Register** (`/auth/register`) — Buat akun gratis dengan nama lengkap, email, dan password (min. 8 karakter).
- Login otomatis mendeteksi role: **admin** diarahkan ke `/admin`, **member** ke `/dashboard`
- Demo akun tersedia: `eko@rewastehub.id` / `demo123` dan `admin@rewastehub.id` / `admin123`

---

### 📊 Dashboard Utama (`/dashboard`)
Halaman ringkasan aktivitas pengguna dengan tampilan **bento grid** yang modern.

| Komponen | Fungsi |
|---|---|
| **Hero Card** | Menampilkan total sampah yang disetor & progress target bulanan |
| **Stat Cards** | Poin diperoleh, total transaksi, dan persentase pertumbuhan bulanan |
| **Charts Section** | Grafik tren setoran bulanan (organik vs anorganik) & komposisi sampah (pie chart) |
| **Recent Transactions** | Daftar 4 transaksi setoran terbaru |
| **Tips Eco** | Kiat lingkungan harian yang dapat diterapkan |
| **Notification Banner** | Banner pengumuman dari admin (muncul otomatis jika ada notif aktif) |
| **Bell Icon Dropdown** | Klik ikon lonceng untuk melihat semua notifikasi aktif dari admin |

---

### ♻️ Bank Sampah Digital (`/dashboard/bank-sampah`)
Menu utama untuk mencatat setoran sampah dan memantau saldo poin.

**Fitur di halaman ini:**
- 📋 **Daftar Harga Sampah** — Referensi harga per kg untuk 6 jenis sampah:
  - Plastik PET, Kertas/Kardus, Logam/Besi, Kaca, Sampah Organik, Elektronik (e-waste)
- 📝 **Form Setoran Sampah** — Pilih jenis sampah, masukkan berat (kg), dan tambahkan catatan opsional
- 📊 **Ringkasan Saldo** — Saldo poin, total setor, total berat, dan poin bulan ini
- 🗂️ **Riwayat Transaksi** — Tabel lengkap semua setoran dengan fitur pencarian & filter, serta status (Selesai / Diproses)

---

### 🌱 Pengolahan Organik (`/dashboard/organik`)
Panduan dan pemantauan proyek pengolahan sampah organik menjadi kompos dan biogas.

**Fitur di halaman ini:**
- 📈 **Statistik** — Total kompos diproduksi, proyek aktif, CO₂ dihemat, hari rata-rata pengomposan
- 📚 **Panduan Membuat Kompos** — 6 langkah terstruktur: dari pengumpulan bahan hingga panen kompos
- 🔬 **Parameter Kompos** — Panduan suhu ideal, kelembapan, aerasi, dan rasio C:N
- 📁 **Proyek Aktif** — Pemantauan kemajuan (progress bar) proyek kompos yang sedang berjalan
- 🚐 **Jadwal Pickup** — Banner untuk menjadwalkan penjemputan sampah organik

---

### 📚 Pusat Edukasi (`/dashboard/edukasi`)
Modul pembelajaran interaktif seputar pengelolaan sampah dan lingkungan.

**Fitur di halaman ini:**
- 📖 **6 Kursus Tersedia**, dikelompokkan berdasarkan kategori:
  - Dasar, Kompos, Daur Ulang, Energi
- **Kursus yang ada:**
  1. Pengenalan Pengelolaan Sampah *(30 menit, 5 modul)*
  2. Cara Membuat Kompos di Rumah *(45 menit, 7 modul)*
  3. Daur Ulang Plastik Kreatif *(60 menit, 8 modul)*
  4. Biogas dari Sampah Organik *(50 menit, 6 modul)*
  5. Gaya Hidup Zero Waste *(40 menit, 6 modul)*
  6. Vermikompos dengan Cacing *(35 menit, 5 modul)*
- 🏆 **Sistem Pencapaian (Badge)** — 4 badge yang bisa diraih berdasarkan kursus yang diselesaikan
- ❓ **Kuis Harian** — Pertanyaan harian berhadiah poin ekstra
- 📜 **Sertifikat** — Dikeluarkan setelah menyelesaikan kursus
- 📊 **Progress Belajar** — Pelacak streak belajar harian & poin edukasi

---

### 🛡️ Admin Dashboard (`/admin`)
Panel administrasi khusus untuk pengelola platform. Hanya dapat diakses oleh akun dengan role **admin**.

> **Login Admin:** `admin@rewastehub.id` / `admin123`

#### Halaman Overview (`/admin`)
- 📊 **4 Stat Cards** — Total pengguna, total setoran, poin beredar, jumlah notifikasi aktif
- 📋 **Recent Announcements** — Daftar 4 pengumuman terakhir dengan status aktif/nonaktif
- ⚡ **Quick Actions** — Shortcut cepat ke halaman kelola pengumuman & dashboard user

#### Kelola Pengumuman (`/admin/announcements`)
Halaman utama manajemen notifikasi/pemberitahuan yang akan tampil di dashboard semua pengguna.

**Fitur:**
- **Form Buat Pengumuman** — Isi judul, pesan, dan pilih tipe:

| Tipe | Warna Banner | Contoh Penggunaan |
|---|---|---|
| 🔵 Informasi | Biru | Pengumuman umum, fitur baru |
| 🟡 Peringatan | Kuning | Peringatan sistem, batas kuota |
| 🔴 Maintenance | Merah | Server down, pemeliharaan rutin |
| 🟢 Sukses | Hijau | Event berhasil, milestone tercapai |

- **Daftar Pengumuman** — Tabel semua pengumuman dengan:
  - Status badge **Live** (aktif) / **Nonaktif**
  - Tombol **toggle** aktif/nonaktif
  - Tombol **hapus** pengumuman
  - Timestamp pembuatan

---

### 🔔 Sistem Notifikasi Admin → User
Pengumuman yang dibuat admin otomatis tampil di dashboard semua pengguna selama berstatus **aktif**.

**Di sisi pengguna:**
- **Banner** berwarna di atas konten halaman (muncul di semua halaman dashboard)
- **Bell icon** di Header menampilkan badge angka jumlah notif aktif
- Klik bell → dropdown list semua pengumuman aktif
- Tombol ✕ untuk menyembunyikan banner (dismiss per sesi)

**Alur data:**
```
Admin buat pengumuman (/admin/announcements)
    ↓ disimpan di localStorage browser
User buka /dashboard
    ↓ NotificationContext membaca localStorage
Banner + Bell badge tampil otomatis
```

---

## 🗺️ Struktur Halaman

```
/                               → Landing Page (Beranda)
/auth/login                     → Halaman Login
/auth/register                  → Halaman Daftar Akun
/dashboard                      → Dashboard Utama (role: member)
/dashboard/bank-sampah          → Bank Sampah Digital
/dashboard/organik              → Pengolahan Organik
/dashboard/edukasi              → Pusat Edukasi
/admin                          → Admin Overview (role: admin)
/admin/announcements            → Kelola Pengumuman & Notifikasi
```

---

## 🧱 Komponen Reusable

| Komponen | Keterangan |
|---|---|
| `Sidebar` | Navigasi samping user (desktop) |
| `AdminSidebar` | Navigasi samping admin (dark theme) |
| `Header` | Header halaman user dengan bell dropdown notifikasi |
| `AdminHeader` | Header admin dengan badge notif aktif & chip role |
| `NotificationBanner` | Banner pengumuman admin di atas konten dashboard user |
| `BottomNav` | Navigasi bawah layar untuk mobile |
| `FloatingActions` | Tombol aksi cepat mengambang |
| `HeroCard` | Kartu hero dashboard dengan progress bar |
| `StatCard` | Kartu statistik dengan gradien & ikon |
| `ChartsSection` | Grafik Recharts: line chart & pie chart |
| `RecentTransactions` | Tabel transaksi terbaru |
| `SplashScreen` | Animasi splash saat pertama buka aplikasi |
| `PageLoading` | Overlay loading saat navigasi antar halaman |

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Fungsi |
|---|---|---|
| **Next.js** | 15.1.3 | Framework React (App Router) |
| **React** | 19 | Library UI |
| **TypeScript** | 5 | Type safety |
| **Tailwind CSS** | 3.4 | Styling utility-first |
| **Recharts** | 2.15 | Visualisasi grafik & chart |
| **Lucide React** | 0.469 | Library ikon |
| **clsx** | 2.1 | Utility class kondisional |

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js versi 18 atau lebih baru
- npm atau yarn

### Langkah-langkah

```bash
# 1. Masuk ke direktori proyek
cd "PPK ORMAWA PGSD"

# 2. Install dependencies
npm install

# 3. Jalankan server development
npm run dev
```

Aplikasi akan berjalan di: **http://localhost:3000**

### Script yang Tersedia

```bash
npm run dev      # Jalankan server development
npm run build    # Build untuk production
npm run start    # Jalankan server production
npm run lint     # Cek kualitas kode (ESLint)
```

---

## 🔑 Akun Demo

| Role | Email | Password | Akses |
|---|---|---|---|
| Member | `eko@rewastehub.id` | `demo123` | `/dashboard` dan semua sub-halaman |
| **Admin** | `admin@rewastehub.id` | `admin123` | `/admin`, `/admin/announcements` |

---

## 📁 Struktur Proyek

```
PPK ORMAWA PGSD/
├── public/
│   ├── logo.png                        # Logo aplikasi
│   └── hero.png                        # Ilustrasi hero landing page
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── layout.tsx                  # Root layout (AuthProvider + NotificationProvider)
│   │   ├── globals.css                 # Global styles
│   │   ├── auth/
│   │   │   ├── login/page.tsx          # Halaman login
│   │   │   └── register/page.tsx       # Halaman register
│   │   ├── dashboard/
│   │   │   ├── page.tsx                # Dashboard utama
│   │   │   ├── bank-sampah/page.tsx    # Bank sampah digital
│   │   │   ├── organik/page.tsx        # Pengolahan organik
│   │   │   └── edukasi/page.tsx        # Pusat edukasi
│   │   └── admin/                      # ✨ Panel Admin
│   │       ├── layout.tsx              # Admin layout + guard role
│   │       ├── page.tsx                # Admin overview
│   │       └── announcements/
│   │           └── page.tsx            # Kelola pengumuman
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── AdminSidebar.tsx            # ✨ Sidebar admin
│   │   ├── Header.tsx                  # ✨ + bell dropdown notifikasi
│   │   ├── AdminHeader.tsx             # ✨ Header admin
│   │   ├── NotificationBanner.tsx      # ✨ Banner pengumuman admin
│   │   ├── BottomNav.tsx
│   │   ├── FloatingActions.tsx
│   │   ├── HeroCard.tsx
│   │   ├── StatCard.tsx
│   │   ├── ChartsSection.tsx
│   │   ├── RecentTransactions.tsx
│   │   ├── SplashScreen.tsx
│   │   └── PageLoading.tsx
│   └── lib/
│       ├── data.ts                     # Data dummy (charts, transaksi, stats)
│       ├── auth.tsx                    # ✨ Context auth + role admin/member
│       └── notifications.tsx           # ✨ NotificationContext + localStorage
├── README.md
├── README_DATABASE.md                  # ✨ Dokumentasi lapisan data
├── package.json
├── tailwind.config.ts
└── next.config.mjs
```

> ✨ = file/folder yang baru ditambahkan

---

## 📊 Statistik Platform (Demo)

- 👥 **12.000+** Pengguna aktif
- ♻️ **250 Ton** Sampah dikelola
- ⭐ **98%** Tingkat kepuasan pengguna
- 🏙️ **50+** Mitra kota

---

*© 2026 Rumah Sampah Digital — PPK ORMAWA PGSD Kelurahan Ciseureuh*
