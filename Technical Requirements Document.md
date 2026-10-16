# Technical Requirements Document (TRD)
## Arsitektur Teknis & Spesifikasi Sistem PT Somaro Medika Utama

### 1. Tech Stack
- **Frontend Framework:** Next.js (React) dengan Server-Side Rendering (SSR) untuk performa dan SEO optimal.
- **Styling:** Tailwind CSS (Kustomisasi warna *Luxury Brown* & *Khaki Harmony*).
- **Animasi & Visual:** Framer Motion & Three.js (React Three Fiber) untuk transisi halus dan elemen interaktif *Apple-design*.
- **Backend & Database:** Supabase / PostgreSQL (Relational database, Auth, dan Row Level Security).
- **API / Logic:** Next.js API Routes / Server Actions & Supabase Edge Functions (TypeScript/Deno).

### 2. Desain Sistem & Palet Warna
- **Luxury Brown (Primary):** `#3D2314` (Teks utama, elemen kontras tinggi, kesan mewah).
- **Khaki Harmony (Secondary):** `#C8B195` / `#E5D9CC` (Latar belakang kartu, tombol sekunder, garis pembatas elegan).
- **Clean White:** `#FFFFFF` (Whitespace yang lapang).

### 3. Skema Database Utama (PostgreSQL)
- `site_content`: Menyimpan teks dan konfigurasi CMS halaman statis.
- `business_services`: Menyimpan data unit bisnis, kategori, dan spesifikasi produk/layanan (JSONB).
- `articles`: Menyimpan data berita, artikel, dan regulasi.
- `partner_inquiries`: Menyimpan pesan masuk dari formulir kemitraan/kontak.
