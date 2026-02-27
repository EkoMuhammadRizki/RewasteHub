# 🗄️ README — Lapisan Data & Database

Dokumen ini menjelaskan bagaimana data dikelola di aplikasi **Rumah Sampah Digital / RewasteHub**, kondisi saat ini (simulasi), dan catatan teknis untuk migrasi ke backend nyata di masa depan.

---

## 📌 Status Saat Ini: Simulasi (No Backend)

Aplikasi saat ini berjalan **sepenuhnya di sisi klien (client-side only)** — belum terhubung ke database atau server eksternal manapun. Semua data bersifat statis atau disimpan sementara di memori browser.

| Jenis Data | Disimpan Di | Persisten? | Keterangan |
|---|---|---|---|
| Data pengguna (user) | React Context (in-memory) | ❌ Hilang saat refresh | Mock hardcoded di `auth.tsx` |
| Statistik dashboard | `src/lib/data.ts` | ❌ Tidak berubah | Static dummy data |
| Transaksi bank sampah | `src/app/dashboard/bank-sampah/page.tsx` | ❌ Tidak berubah | Array statis |
| Data kursus edukasi | `src/app/dashboard/edukasi/page.tsx` | ❌ Tidak berubah | Array statis |
| Proyek organik | `src/app/dashboard/organik/page.tsx` | ❌ Tidak berubah | Array statis |
| **Notifikasi / Pengumuman Admin** | **`localStorage`** | **✅ Persisten** | Dibuat via admin panel, muncul di dashboard user |

---

## 🔔 Notifikasi Admin → User (localStorage)

Fitur **admin notification** adalah satu-satunya data yang benar-benar persisten menggunakan `localStorage` browser.

### Key yang Digunakan

| localStorage Key | Tipe | Isi |
|---|---|---|
| `rsd_notifications` | `JSON string` | Array objek notifikasi |

### Struktur Data Notifikasi

```json
[
  {
    "id": "notif_1709042069123",
    "title": "Maintenance Server",
    "message": "Sistem akan mengalami downtime pada pukul 23.00 WIB selama 1 jam.",
    "type": "maintenance",
    "active": true,
    "createdAt": "2026-02-27T22:34:00.000Z"
  }
]
```

### Field Detail

| Field | Tipe | Nilai yang Valid | Keterangan |
|---|---|---|---|
| `id` | `string` | `notif_<timestamp>` | ID unik auto-generate |
| `title` | `string` | Bebas | Judul pengumuman |
| `message` | `string` | Bebas | Isi pesan yang ditampilkan ke user |
| `type` | `string` | `"info"` \| `"warning"` \| `"maintenance"` \| `"success"` | Menentukan warna banner |
| `active` | `boolean` | `true` / `false` | Jika `true`, banner tampil di dashboard user |
| `createdAt` | `string` | ISO 8601 | Timestamp pembuatan |

### Warna Banner Berdasarkan Tipe

| Tipe | Warna | Ikon | Contoh Penggunaan |
|---|---|---|---|
| `maintenance` | 🔴 Merah | 🔧 | Server down, pemeliharaan rutin |
| `warning` | 🟡 Kuning | ⚠️ | Peringatan sistem, batas kuota |
| `info` | 🔵 Biru | ℹ️ | Informasi umum, pengumuman biasa |
| `success` | 🟢 Hijau | ✅ | Fitur baru, hasil event berhasil |

### Alur Data

```
Admin buat pengumuman
  ↓ [`/admin/announcements`]
NotificationContext.addNotification()
  ↓
localStorage.setItem("rsd_notifications", JSON.stringify([...]))
  ↓
User buka dashboard [`/dashboard`]
  ↓
NotificationContext membaca localStorage
  ↓
<NotificationBanner /> render jika ada notif active: true
<Header /> bell icon tampilkan badge jumlah notif
```

> **⚠️ Catatan Penting:**
> `localStorage` hanya tersimpan di **browser yang sama** dan **perangkat yang sama**.
> Data tidak akan dibagikan ke pengguna lain. Ini hanya cocok untuk demo/prototype.
> Untuk production, data notifikasi **harus disimpan di database server**.

---

## 🔐 Data Autentikasi (Mock)

Autentikasi disimulasikan di `src/lib/auth.tsx` menggunakan array hardcoded.

### Mock Users

```typescript
const MOCK_USERS = [
  { name: "Eko",   email: "eko@rewastehub.id",   password: "demo123", role: "member" },
  { name: "Admin", email: "admin@rewastehub.id",  password: "admin123", role: "admin"  },
];
```

> **⚠️ Catatan Keamanan:**
> Password disimpan **plaintext** di source code. Ini **TIDAK AMAN** untuk production.
> Di production, harus menggunakan hashing (bcrypt) dan autentikasi server-side.

---

## 📊 Data Statis (Dummy)

File `src/lib/data.ts` menyimpan semua data yang digunakan untuk chart dan statistik dashboard.

```typescript
// Tren setoran bulanan (untuk chart line)
export const depositTrendsData = [
  { month: "Jul", organic: 120, anorganic: 85 },
  // ... 7 bulan data
];

// Komposisi sampah (untuk pie chart)
export const wasteCompositionData = [
  { name: "Organik",   value: 58, color: "#10b981" },
  { name: "Anorganik", value: 32, color: "#6ee7b7" },
  { name: "B3",        value: 10, color: "#d1fae5" },
];

// Ringkasan statistik
export const statsData = {
  totalWaste: 1248,          // kg
  progressPercent: 72,       // persen dari target
  pointsEarned: 8340,        // total poin
  totalTransactions: 47,     // jumlah setoran
  monthlyGrowth: 23.5,       // persen pertumbuhan
};
```

---

## 🚀 Rencana Migrasi ke Backend (Catatan untuk Pengembangan Lanjut)

Berikut catatan teknis untuk menggantikan simulasi ini dengan backend yang nyata:

### Opsi 1 — Google Sheets + Apps Script *(Rekomendasi untuk pemula)*

Sudah ada placeholder di kode (`src/lib/auth.tsx` baris 20-25). Langkah:

1. Buat Google Spreadsheet dengan sheet-sheet berikut:
   - `Users` — Kolom: `name`, `email`, `password_hash`, `role`, `created_at`
   - `Transactions` — Kolom: `id`, `user_email`, `waste_type`, `weight_kg`, `points`, `date`, `status`
   - `Notifications` — Kolom: `id`, `title`, `message`, `type`, `active`, `created_at`
   - `Courses` — Kolom: `id`, `user_email`, `course_id`, `progress`, `completed`
2. Deploy **Google Apps Script** sebagai Web App (POST endpoint)
3. Ganti mock di `auth.tsx` dengan `fetch()` ke Google Sheets API

```typescript
// Contoh: fetch user dari Google Sheets
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const API_KEY  = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const res = await fetch(
  `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Users!A:E?key=${API_KEY}`
);
const { values } = await res.json();
// values[0] = header row, values[1..] = data rows
```

### Opsi 2 — Supabase *(PostgreSQL + Auth siap pakai)*

- Gratis tier cukup untuk skala kelurahan
- Buat tabel sesuai skema di bawah
- Ganti Context dengan Supabase client SDK

### Opsi 3 — Firebase Firestore *(NoSQL, real-time)*

- Notifikasi admin bisa real-time tanpa polling
- Autentikasi bawaan Firebase Auth

---

## 📋 Rancangan Skema Database (untuk Migrasi)

### Tabel `users`
```sql
CREATE TABLE users (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,  -- bcrypt hash
  role       VARCHAR(20)  DEFAULT 'member',  -- 'member' | 'admin'
  points     INTEGER      DEFAULT 0,
  created_at TIMESTAMPTZ  DEFAULT NOW()
);
```

### Tabel `transactions`
```sql
CREATE TABLE transactions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES users(id),
  waste_type VARCHAR(100) NOT NULL,
  weight_kg  DECIMAL(8,2) NOT NULL,
  points     INTEGER      NOT NULL,
  status     VARCHAR(20)  DEFAULT 'pending',  -- 'pending' | 'success'
  date       TIMESTAMPTZ  DEFAULT NOW()
);
```

### Tabel `notifications`
```sql
CREATE TABLE notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      VARCHAR(200)  NOT NULL,
  message    TEXT          NOT NULL,
  type       VARCHAR(20)   NOT NULL,  -- 'info' | 'warning' | 'maintenance' | 'success'
  active     BOOLEAN       DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ   DEFAULT NOW()
);
```

### Tabel `course_progress`
```sql
CREATE TABLE course_progress (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id),
  course_id   INTEGER      NOT NULL,
  progress    INTEGER      DEFAULT 0,  -- 0-100
  completed   BOOLEAN      DEFAULT false,
  completed_at TIMESTAMPTZ
);
```

---

## 🔑 Environment Variables yang Diperlukan

Buat file `.env.local` di root proyek saat beralih ke backend:

```env
# Untuk Google Sheets
NEXT_PUBLIC_SHEET_ID=your_spreadsheet_id_here
NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key_here
APPS_SCRIPT_URL=https://script.google.com/macros/s/your_script_id/exec

# Untuk Supabase (alternatif)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Untuk Firebase (alternatif)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

> `.env.local` sudah ada di `.gitignore` Next.js secara default. **Jangan pernah commit file ini ke repository.**

---

*Dokumen ini dibuat: 27 Februari 2026 | Versi aplikasi: 0.1.0*
