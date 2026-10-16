# UI/UX DESIGN BRIEF (REVISED: APPLE-DESIGN & HALLMARK ANTI-AI-SLOP)
## Platform Website Korporat & Sistem Manajemen Holding PT Somaro Medika Utama

---

### 1. Filosofi & Standar Desain Inti
Dokumen ini mengintegrasikan standar **Apple Human Interface Guidelines (HIG)** dengan metodologi **Hallmark Anti-AI-Slop Design System**:

- **Apple HIG Foundations:**
  - **Clarity (Kejelasan):** Tipografi sans-serif modern yang tajam (SF Pro Display), hierarki informasi yang terarah, serta ruang kosong (*whitespace/breathing room*) yang lapang.
  - **Deference (Penghormatan Konten):** Elemen antarmuka mendukung konten tanpa mendominasi. Menggunakan material *frosted glass* halus (*specular translucent surfaces*) dan bayangan difusi multi-stop ambient (*shadow-apple*).
  - **Depth (Kedalaman Visual):** Lapisan visual terstruktur dengan kurva kontinu (*squircles* `rounded-3xl`), garis pembatas tipis (*hairline translucent borders*), dan kedalaman dimensional.
- **Hallmark Anti-AI-Slop Disciplines:**
  - **Pre-Emit Self-Critique:** Memenuhi standar skor 5/5 pada 6 sumbu (Philosophy, Hierarchy, Execution, Specificity, Restraint, Variety).
  - **Honest Copy (Gate 46):** Tidak menggunakan metrik fiktif. Seluruh data (250+ tempat tidur, 5.000.000+ unit maklon/bulan, akreditasi KARS Paripurna, CPOB/CPKB BPOM) bersumber dari fakta operasional holding.
  - **Typography Purity (Gate 38a):** Seluruh *heading* dan judul kartu menggunakan teks tegak Romawi (`font-style: normal`), tanpa *italic headers* klise buatan AI.
  - **Locked Tokens (Gate 48):** Warna dan spasi terkunci pada sistem token CSS yang konsisten.
  - **Mobile Robustness (Gates 49–53):** Responsif di resolusi 320px–1440px tanpa *horizontal scroll* (`overflow-x: clip`), dan tombol interaktif memenuhi batas minimal sentuh 44×44px tanpa teks terpotong dua baris.

---

### 2. Panduan Identitas Visual & Token Desain
- **Primary Luxury Brown (`#3D2314` / `#2A170C`):** Melambangkan kepemimpinan holding, stabilitas finansial, dan prestise medis tingkat tinggi. Digunakan untuk teks utama, latar belakang gelap beraksen mewah, dan kartu sorotan utama.
- **Khaki Harmony (`#C8B195` / `#E5D9CC` / `#FAF7F4`):** Memberikan kehangatan elegan, rasa aman, dan kebersihan khas dunia medis modern. Digunakan untuk latar kartu interaktif, tombol sekunder, dan garis batas halus.
- **Clean White (`#FFFFFF`):** Kanvas dasar yang memberikan keterbacaan tinggi (*high-contrast readability*).
- **Accent Soft Gold (`#D4AF37` / `#B08D25`):** Digunakan secara proporsional dan hemat untuk menyoroti lencana penghargaan (*compliance badges*) dan indikator aktif.
- **Material Frosted Glass:** `background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(24px) saturate(180%);`

---

### 3. Arsitektur Komponen & Tata Letak Makro (Macrostructure)

#### A. Macrostructure 01 · Bento Grid with Marquee Polish
- **Hero Showcase Dinamis (CMS-Controlled Media):**
  - Menggantikan visual statis/3D kaku dengan **Cinematic Media Hero** (Video sinematik fasilitas rumah sakit/cleanroom farmasi atau Foto beresolusi tinggi dengan pencahayaan mewah).
  - Media dapat dikonfigurasi penuh melalui panel **Admin CMS** (Pilihan tipe: `video` / `image`, input URL media, poster cadangan, headline, dan teks tombol CTA).
  - Dilengkapi *frosted pill badge*, tipografi berskala fluid (`clamp(2.5rem, 5vw + 1rem, 4.5rem)`), dan tombol aksi dengan respons pegas (*apple spring interaction*).
- **Bento Grid 3 Pilar Bisnis:**
  - *Spotlight Card (7 Kolom):* **Somaro Hospital & Klinik Utama** — menampilkan fasilitas kamar bedah modular (OT Cleanroom), ICU/NICU terpadu, dan integrasi SatuSehat Kemenkes.
  - *Precision Tiles (5 Kolom Stack):* **Maklon Farmasi & Kosmetik (OEM/ODM)** dan **Pengadaan Alat Kesehatan & Mesin Manufaktur**.
- **Filosofi Nilai Inti (Shòu, Mǎn, Lù):**
  - Tiga kartu berimbang dengan ikonografi presisi dan narasi filosofis keberlanjutan hidup, kesempurnaan formula, dan kemitraan global.
- **Pusat Regulasi & Berita Industri:**
  - Kartu publikasi editorial dengan *hairline borders* dan tag verifikasi standar BPOM/Kemenkes.

#### B. Nav Archetype N5 · Floating Frosted Pill
- Bentuk kapsul mengambang dengan latar *frosted blur* kaca dan garis batas *specular*.
- Berisi logo holding monogram di sisi kiri, menu tautan minimal di tengah, dan tombol aksi kemitraan di sisi kanan.
- Transisi mulus saat digulir (*scroll reveal blur*).

#### C. Footer Archetype Ft5 · Statement & Regulatory Wall
- Pernyataan komitmen korporat holding, navigasi pilar bisnis, dan dinding sertifikasi resmi:
  - Kementerian Kesehatan RI (Izin Operasional & Akreditasi Paripurna)
  - BPOM RI (Sertifikasi CPOB & CPKB)
  - CDAKB & SNI ISO 13485 (Penyalur Alat Kesehatan)
  - Badan Penyelenggara Jaminan Produk Halal (Halal MUI)

---

### 4. Sistem Manajemen Konten & CRUD Admin
- **CMS Hero Media Editor:** Administrator dapat mengganti latar/showcase Hero secara instan antara Foto (High-Res Image) atau Video (MP4/WebM Streaming) tanpa menyentuh kode program.
- **Manajemen Pesan Masuk (Inquiries):** Pemantauan prospek kemitraan dengan filter status (*unread, contacted, resolved*) dan pencatatan notulen internal.
- **Katalog Layanan & Alkes:** CRUD spesifikasi teknis dan fasilitas pilar bisnis.
- **Publikasi Artikel:** Editor berita kesehatan dan audit kepatuhan regulasi dengan status *Draft/Published*.
