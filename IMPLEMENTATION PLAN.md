# **IMPLEMENTATION PLAN: PT SOMARO MEDIKA UTAMA PLATFORM**

**Target Durasi Total:** 4 Minggu (28 Hari Kerja)

**Metodologi:** Agile / Iterative Development

## **TAHAP 1: Persiapan Proyek & Pengaturan Lingkungan (Hari 1 – Hari 5\)**

*Tujuan: Membangun fondasi proyek, konfigurasi repositori, dan menghubungkan layanan infrastruktur dasar.*

* **Inisialisasi Repositori & Next.js:**  
  * Membuat proyek Next.js baru menggunakan App Router dan TypeScript.  
  * Mengonfigurasi Tailwind CSS dan mendefinisikan variabel warna kustom (`#3D2314` untuk *Luxury Brown* dan `#C8B195` / `#E5D9CC` untuk *Khaki Harmony*).  
* **Konfigurasi Supabase & Database:**  
  * Menyiapkan proyek baru di Supabase.  
  * Menjalankan skema SQL yang telah dirancang (tabel `admin_users`, `site_contents`, `business_services`, `articles`, dan `partner_inquiries`).  
  * Mengaktifkan *Row Level Security (RLS)* dan menguji kebijakan akses publik vs. admin.  
* **Setup Pustaka Animasi & UI:**  
  * Memasang dan mengonfigurasi **Framer Motion** untuk transisi halus serta **Three.js / React Three Fiber** untuk elemen visual 3D interaktif pada *Hero Section*.  
  * Menginstal pustaka ikon (Lucide React) dan komponen pendukung formulir (React Hook Form / Zod).

## **TAHAP 2: Pengembangan Website Publik & Animasi (Hari 6 – Hari 14\)**

*Tujuan: Mengembangkan antarmuka sisi pengguna (Frontend) dengan standar estetika tinggi (Apple-design) dan interaksi yang imersif.*

* **Pengembangan Layout Utama & Komponen Global:**  
  * Membuat *Navbar* responsif dengan *sticky header* dan *dropdown menu* unit bisnis, serta *Footer* informatif dengan tautan regulasi (BPOM, Kemenkes, SNI).  
* **Pengembangan Halaman Beranda (Home):**  
  * Implementasi *Hero Section* dinamis menggunakan *Three.js* / *Framer Motion*.  
  * Pembuatan seksi ringkasan 3 pilar bisnis holding (Hospital, Maklon & Distribusi Farmasi, Pengadaan Alkes) dengan efek *hover* yang elegan.  
  * Penjabaran filosofi Visi-Misi (*Shòu/Sō, Mǎn/Ma, Lù/Rō*).  
* **Pengembangan Halaman Korporat & Unit Bisnis:**  
  * Halaman **Tentang Kami**: Sejarah, struktur organisasi, dan profil holding.  
  * Halaman **Unit Bisnis**: Katalog interaktif untuk Layanan Rumah Sakit, Maklon Kosmetik/Skincare (OEM/ODM), dan Mesin/Alat Kesehatan.  
  * Halaman **Berita & Regulasi**: Pusat artikel dan transparan informasi standar industri.  
* **Integrasi Formulir Kemitraan (*Partner Inquiry*):**  
  * Membangun formulir kontak interaktif di halaman Hubungi Kami dengan validasi *frontend* (Zod) yang langsung terhubung ke database Supabase.

## **TAHAP 3: Pengembangan Panel Admin & Sistem CRUD (Hari 15 – Hari 22\)**

*Tujuan: Membangun sistem manajemen backend yang aman bagi pengelola internal menggunakan kontrol hak akses berbasis peran (RBAC).*

* **Autentikasi & Proteksi Rute (Admin Auth):**  
  * Membuat halaman login admin (`/admin/login`) menggunakan **Supabase Auth**.  
  * Mengonfigurasi *Middleware* Next.js untuk memproteksi seluruh rute `/admin/*` hanya bagi pengguna yang terautentikasi dan aktif.  
* **Dashboard Utama Admin (`/admin/dashboard`):**  
  * Menampilkan statistik ringkas (jumlah pesan masuk baru, total artikel terbit, jumlah produk/layanan).  
* **Fitur CRUD Modul Utama:**  
  * **Manajemen CMS Beranda/Profil:** Antarmuka untuk menyunting teks statis dan konfigurasi konten situs.  
  * **Manajemen Unit Bisnis & Produk:** Fitur Tambah, Ubah, Hapus, dan Lihat data katalog layanan hospital, maklon, dan alat kesehatan (termasuk pengelolaan spesifikasi JSON).  
  * **Manajemen Berita & Artikel:** Editor artikel lengkap dengan unggah gambar, pengaturan kategori, dan tombol publikasi (*Publish/Draft*).  
  * **Manajemen Pesan Kemitraan (*Inquiries*):** Tabel interaktif untuk memantau pesan masuk dari calon mitra, mengubah status penanganan (*unread, contacted, resolved*), dan memberikan catatan internal.

## **TAHAP 4: Pengujian, Optimasi Performa & Peluncuran (Hari 23 – Hari 28\)**

*Tujuan: Memastikan kualitas, keamanan, kecepatan muat, dan kesiapan penuh sistem sebelum dirilis ke publik.*

* **Optimasi Performa & SEO:**  
  * Menerapkan *Server-Side Rendering (SSR)* dan *Incremental Static Regeneration (ISR)* pada halaman publik untuk performa SEO yang optimal.  
  * Kompresi aset gambar ke format modern (WebP) dan pengujian kecepatan (*Lighthouse Audit* target skor \>90).  
* **Pengujian Fungsional & Keamanan (*QA Testing*):**  
  * Pengujian end-to-end (E2E) pada alur pengiriman formulir kemitraan hingga data masuk ke database.  
  * Pengujian hak akses RLS Supabase (memastikan publik tidak dapat mengakses rute atau operasi CRUD admin).  
* **Deployment & Konfigurasi Domain:**  
  * Menghubungkan repositori ke platform hosting (seperti Vercel).  
  * Mengonfigurasi variabel lingkungan (*Environment Variables*) produksi untuk Supabase.  
  * Menghubungkan domain resmi perusahaan dan mengaktifkan sertifikat SSL.

