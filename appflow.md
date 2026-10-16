# Application Flow (Appflow)
## Platform Website Korporat & Sistem Manajemen Holding Kesehatan PT Somaro Medika Utama

Dokumen ini memetakan seluruh alur interaksi pengguna (*user journey*) pada website publik serta alur kerja administrator (*admin workflow*) di balik layar.

---

### 1. Alur Pengguna Publik (Public User Flow)
Alur ini menggambarkan bagaimana pengunjung atau calon mitra bisnis menavigasi website PT Somaro Medika Utama:

#### Beranda (Landing Page):
1. Pengguna mengakses domain utama (`/`).
2. Sistem memuat Hero Section dengan animasi 3D/Framer Motion bernuansa *Luxury Brown* dan *Khaki Harmony*.
3. Pengguna melihat ringkasan pengenalan perusahaan holding serta 3 pilar utama bisnis (Layanan Rumah Sakit, Maklon & Distribusi Farmasi, serta Pengadaan Alkes).
4. Pengguna melakukan *smooth scroll* ke bawah untuk membaca Visi-Misi perusahaan serta tautan cepat ke unit-unit bisnis.

#### Eksplorasi Halaman Korporat & Layanan:
- **Menu "Tentang Kami":** Pengguna membaca profil perusahaan, sejarah, struktur organisasi, dan penjabaran detail nilai filosofis Visi-Misi (Shòu/Sō, Mǎn/Ma, Lù/Rō).
- **Menu "Unit Bisnis & Layanan":**
  - Memilih sub-menu *Hospital & Klinik* untuk melihat fasilitas medis dan standar keselamatan pasien.
  - Memilih sub-menu *Maklon & Distribusi* untuk melihat layanan OEM/ODM skincare, kosmetik, dan obat berstandar CPOB/BPOM.
  - Memilih sub-menu *Pengadaan Alat Kesehatan* untuk melihat katalog mesin manufaktur dan peralatan medis mutakhir.
- **Menu "Berita & Regulasi":** Pengguna membaca artikel kesehatan, pembaruan standar industri, serta transparansi kepatuhan regulasi (Kemenkes, BPOM, SNI).

#### Konversi & Keterlibatan (Inquiry Flow):
1. Pengguna membuka halaman Kontak.
2. Pengguna mengisi formulir kemitraan bisnis (*Partner Inquiry*) yang mencakup nama, perusahaan, email, nomor telepon, pilihan layanan, dan pesan.
3. Pengguna menekan tombol "Kirim Pesan", dan sistem menyimpan data ke database PostgreSQL serta menampilkan notifikasi sukses.

---

### 2. Alur Manajemen Administrator (Admin Management Flow)
Alur ini menggambarkan bagaimana tim internal mengelola konten website dan data operasional:

#### Autentikasi Admin:
1. Administrator mengakses `/admin/login`.
2. Memasukkan kredensial (Email & Password) yang divalidasi melalui Supabase Auth.
3. Setelah berhasil, sistem mengarahkan admin ke Dashboard Utama (`/admin/dashboard`).

#### Manajemen Konten & CMS:
- **Halaman Beranda & Profil:** Admin dapat memperbarui teks Visi-Misi, banner utama, dan informasi statis secara *real-time*.
- **Manajemen Unit Bisnis & Produk:** Admin melakukan operasi CRUD (Create, Read, Update, Delete) untuk menambah, mengubah spesifikasi, atau menghapus data katalog alat kesehatan dan layanan maklon.
- **Manajemen Berita & Artikel:** Admin menulis artikel baru, mengatur kategori, mengunggah thumbnail, dan mengubah status artikel menjadi *Published* atau *Draft*.

#### Manajemen Pesan & Kemitraan (Inquiry Management):
1. Admin membuka menu Pesan Masuk (`/admin/inquiries`).
2. Admin meninjau daftar formulir kemitraan yang dikirim oleh calon klien dari website publik.
3. Admin memperbarui status pesan (misalnya dari *Unread* menjadi *Contacted* atau *Resolved*) setelah menindaklanjuti prospek tersebut.
