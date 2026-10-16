import { BusinessService, Article, PartnerInquiry, SiteContent } from '@/types';

export const initialSiteContents: Record<string, SiteContent> = {
  hero: {
    id: 'hero-1',
    section_key: 'hero',
    title: 'Inovasi Medis Terpadu & Ekosistem Kesehatan Masa Depan',
    subtitle: 'PT Somaro Medika Utama',
    content_body:
      'Holding kesehatan terkemuka yang mengintegrasikan keunggulan rumah sakit, manufaktur maklon farmasi & estetika, serta teknologi alat kesehatan berstandar regulasi tertinggi.',
    metadata: {
      media_type: 'image',
      media_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=85',
      poster_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=85',
      media_caption: 'Fasilitas Bedah Modular & Cleanroom Manufaktur CPOB',
    },
    updated_at: new Date().toISOString(),
  },
  vision_mission: {
    id: 'vm-1',
    section_key: 'vision_mission',
    title: 'Filosofi & Pilar Strategis Holding',
    subtitle: 'Keberlanjutan, Kesempurnaan, dan Kemitraan Global',
    content_body:
      'Kami mendedikasikan seluruh potensi inovasi demi menghadirkan mutu layanan klinis dan industri farmasi berkelas dunia bagi Indonesia.',
    metadata: {
      shou: {
        symbol: 'Shòu / Sō',
        title: 'Keberlanjutan & Inovasi Layanan Hospital',
        desc: 'Fasilitas rumah sakit dan klinik terdepan yang memprioritaskan keselamatan pasien, teknologi digital terintegrasi, dan kehangatan dedikasi medis.',
      },
      man: {
        symbol: 'Mǎn / Ma',
        title: 'Kesempurnaan & Ketulusan Maklon Farmasi-Kecantikan',
        desc: 'Inovasi OEM/ODM produk kecantikan estetika, kosmetik, dan sediaan farmasi dengan kepatuhan CPOB/CPKB mutlak serta riset formulasi terunggul.',
      },
      lu: {
        symbol: 'Lù / Rō',
        title: 'Kemitraan Global Pengadaan Mesin & Alkes Modern',
        desc: 'Distribusi instrumen diagnostik canggih, mesin sterilisasi, dan peralatan medikal presisi tinggi yang memenuhi standar Kemenkes RI dan global.',
      },
    },
    updated_at: new Date().toISOString(),
  },
};

export const initialServices: BusinessService[] = [
  {
    id: 'srv-hospital',
    category: 'hospital',
    title: 'Somaro Hospital & Klinik Utama',
    slug: 'hospital-klinik-utama',
    summary:
      'Pusat layanan kesehatan komprehensif dengan ruang rawat inap modern, poliklinik spesialis, serta unit gawat darurat 24/7.',
    description:
      'Rumah sakit dan klinik kami menggabungkan keunggulan dokter spesialis berpengalaman, fasilitas bedah mutakhir, ICU terpadu, dan rekam medis digital yang saling terhubung untuk memberikan penanganan medis yang cepat, aman, dan presisi.',
    image_url:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    specifications: {
      'Kapasitas Ruang Rawat': '250+ Tempat Tidur Standar VVIP & Eksekutif',
      'Layanan Unggulan': 'Pusat Kardiovaskular, Onkologi & Bedah Minimal Invasif',
      'Standar Akreditasi': 'KARS Paripurna & Integrasi SatuSehat Kemenkes',
      'Fasilitas Khusus': 'Ruang Operasi Modular (OT Cleanroom) & ICU Terisolasi',
    },
    standards: ['Kemenkes RI', 'KARS Paripurna', 'SatuSehat Integrated'],
    is_featured: true,
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'srv-maklon',
    category: 'maklon_farmasi',
    title: 'Maklon Farmasi, Skincare & Kosmetik (OEM/ODM)',
    slug: 'maklon-farmasi-estetika',
    summary:
      'Layanan produksi kontrak menyeluruh untuk produk kecantikan medis, kosmetika estetika, dan sediaan farmasi terstandarisasi BPOM.',
    description:
      'Dukungan penuh dari hulu ke hilir untuk brand owner dan institusi klinis: mulai dari formulasi riset laboratorium (R&D), uji efikasi dan stabilitas, pengurusan izin edar BPOM dan Halal, hingga manufaktur skala besar dengan desain kemasan premium.',
    image_url:
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    specifications: {
      'Kapasitas Manufaktur': '5.000.000+ unit sediaan per bulan',
      'Standar Fasilitas': 'Cleanroom Kelas 10.000 (Grade C/D Pharma Standards)',
      'Layanan Formulasi': 'Dermokosmetik, Serum Anti-Aging, Obat Bebas, Herbal Ekstrak',
      'Sertifikasi Lengkap': 'CPOB, CPKB, Halal BPJPH, ISO 22716',
    },
    standards: ['CPOB BPOM', 'CPKB BPOM', 'Halal BPJPH', 'ISO 22716'],
    is_featured: true,
    order_index: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'srv-alkes',
    category: 'alat_kesehatan',
    title: 'Pengadaan Alat Kesehatan & Mesin Manufaktur',
    slug: 'pengadaan-alat-kesehatan',
    summary:
      'Penyedia instrumen diagnostik mutakhir, mesin sterilisasi bertekanan tinggi, serta perangkat pendukung operasi medis modern.',
    description:
      'Bermitra dengan prinsipal teknologi medis internasional untuk memasok alat kesehatan berkualitas tinggi ke rumah sakit, laboratorium uji klinis, dan industri manufaktur farmasi dengan jaminan kalibrasi dan dukungan teknis 24/7.',
    image_url:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    specifications: {
      'Kategori Utama': 'Mesin Imaging (CT/MRI), Bedah Laparoskopi, Ventilator ICU',
      'Izin Edar': 'Izin Penyalur Alat Kesehatan (IPAK) & Sertifikasi AKL/AKD',
      'Dukungan Teknis': 'Insinyur Biomedis Bersertifikat & Suku Cadang Orisinal',
      'Jaminan Mutu': 'Sertifikasi Kalibrasi Berkala & SNI ISO 13485',
    },
    standards: ['CDAKB Kemenkes', 'AKL/AKD Certified', 'SNI ISO 13485'],
    is_featured: true,
    order_index: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const initialArticles: Article[] = [
  {
    id: 'art-1',
    title: 'Penerapan Standar Baru CPOB 2026 dalam Manufaktur Kosmetik & Farmasi',
    slug: 'penerapan-standar-baru-cpob-2026',
    category: 'Regulasi & Kepatuhan',
    excerpt:
      'Bagaimana PT Somaro Medika Utama mengimplementasikan kepatuhan audit BPOM dan validasi ruang bersih termutakhir untuk keamanan produk.',
    content: `Kepatuhan regulasi dalam industri farmasi dan estetika kosmetika adalah kunci utama perlindungan konsumen sekaligus kredibilitas korporat. PT Somaro Medika Utama secara berkesinambungan menyempurnakan fasilitas produksi dengan protokol Cara Pembuatan Obat yang Baik (CPOB) dan Cara Pembuatan Kosmetika yang Baik (CPKB).

Dalam audit terkini, sistem tata udara (HVAC) berkategori HEPA Filter bertekanan positif dan pemantauan partikel mikrobiologi secara otomatis memastikan sediaan bebas dari risiko kontaminasi silang. Hal ini menjamin setiap botol kosmetik dan sediaan farmasi yang diproduksi memenuhi standar higienis level tertinggi.`,
    thumbnail_url:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Tim Regulatoris Somaro',
    is_published: true,
    published_at: '2026-03-15T08:00:00Z',
    created_at: '2026-03-15T08:00:00Z',
  },
  {
    id: 'art-2',
    title: 'Transformasi Digital Layanan Rumah Sakit: Minimalis, Cepat, dan Presisi',
    slug: 'transformasi-digital-layanan-rumah-sakit',
    category: 'Inovasi Klinis',
    excerpt:
      'Menghadirkan pengalaman pasien yang mulus melalui integrasi sistem rekam medis elektronik dan alur rawat jalan tanpa antrean berbelit.',
    content: `Kenyamanan dan ketenangan batin pasien adalah bagian tak terpisahkan dari proses penyembuhan. Di Somaro Hospital & Klinik Utama, kami mengadopsi filosofi desain ruang yang tenang dan alur digital minimalis yang memangkas waktu tunggu rawat jalan hingga 60%.

Mulai dari registrasi daring, pengingat jadwal konsultasi otomatis, hingga integrasi data riwayat laboratorium dengan SatuSehat Kemenkes, ekosistem digital kami memastikan dokter spesialis mendapatkan diagnosis presisi dalam waktu singkat.`,
    thumbnail_url:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Divisi Pelayanan Medis',
    is_published: true,
    published_at: '2026-03-20T10:30:00Z',
    created_at: '2026-03-20T10:30:00Z',
  },
  {
    id: 'art-3',
    title: 'Peran Mesin Diagnostik Presisi Tinggi dalam Deteksi Dini Penyakit Kronis',
    slug: 'peran-mesin-diagnostik-presisi-tinggi',
    category: 'Teknologi Medis',
    excerpt:
      'Investasi teknologi radiologi generasi baru dan instrumen laboratorium mutakhir memperkuat akurasi diagnosis dini.',
    content: `Deteksi dini adalah pembeda utama antara tindakan preventif yang efektif dengan intervensi darurat yang berisiko tinggi. Divisi Pengadaan Alkes PT Somaro Medika Utama memfasilitasi pengadaan perangkat computed tomography beremisi rendah serta ultrasonografi 4D resolusi tinggi untuk seluruh jejaring fasilitas kesehatan rekanan kami.

Investasi berkelanjutan pada instrumentasi medis modern ini membuktikan visi holding untuk memimpin revolusi layanan kesehatan di Indonesia.`,
    thumbnail_url:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Departemen Biomedika',
    is_published: true,
    published_at: '2026-03-28T14:15:00Z',
    created_at: '2026-03-28T14:15:00Z',
  },
  {
    id: 'art-4',
    title: 'Standar Akreditasi Paripurna KARS & Keselamatan Pasien di Ruang Bedah Modular',
    slug: 'standar-akreditasi-paripurna-kars-ruang-bedah',
    category: 'Inovasi Klinis',
    excerpt:
      'Protokol sterilisasi berlapis dan pemantauan tekanan udara positif di instalasi bedah sentral Somaro Hospital.',
    content: `Keselamatan pasien selama tindakan pembedahan bergantung pada integrasi keahlian dokter bedah dan keandalan infrastruktur ruang operasi. Seluruh kamar bedah modular di jaringan Somaro Hospital telah dilengkapi sistem Laminar Airflow dengan filtrasi HEPA H14 yang menyaring 99,995% partikel mikroorganisme.

Evaluasi berkala oleh Komite Akreditasi Rumah Sakit (KARS) dan kepatuhan Indikator Nasional Mutu memastikan tingkat infeksi daerah operasi ditekan mendekati nol persen.`,
    thumbnail_url:
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Komite Mutu Klinis',
    is_published: true,
    published_at: '2026-04-04T09:00:00Z',
    created_at: '2026-04-04T09:00:00Z',
  },
  {
    id: 'art-5',
    title: 'Inovasi Bahan Aktif Dermokosmetik Berbasis Bukti Ilmiah untuk Iklim Tropis',
    slug: 'inovasi-bahan-aktif-dermokosmetik-tropis',
    category: 'Regulasi & Kepatuhan',
    excerpt:
      'Riset formulasi stabilitas tinggi dari laboratorium R&D Somaro untuk perlindungan skin barrier dan hiperpigmentasi.',
    content: `Kulit masyarakat di wilayah beriklim tropis membutuhkan pendekatan formulasi dermokosmetik yang spesifik—ringan, non-komedogenik, namun memiliki penetrasi bahan aktif yang optimal. Tim R&D Maklon Farmasi Somaro mengembangkan sistem enkapsulasi liposom generasi baru yang menjaga stabilitas bahan aktif pencerah dan antioksidan.

Seluruh formula diuji secara dermatologis dan didaftarkan secara resmi melalui sistem notifikasi BPOM RI serta jaminan sertifikasi Halal.`,
    thumbnail_url:
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Pusat Riset Formulasi',
    is_published: true,
    published_at: '2026-04-10T11:20:00Z',
    created_at: '2026-04-10T11:20:00Z',
  },
  {
    id: 'art-6',
    title: 'Pentingnya Sertifikasi CDAKB dalam Rantai Distribusi Alat Kesehatan Nasional',
    slug: 'pentingnya-sertifikasi-cdakb-distribusi-alkes',
    category: 'Teknologi Medis',
    excerpt:
      'Menjamin keaslian suku cadang, akurasi kalibrasi sensor, dan keamanan suhu penyimpanan instrumen medis.',
    content: `Cara Distribusi Alat Kesehatan yang Baik (CDAKB) dari Kementerian Kesehatan RI bukan sekadar syarat administratif, melainkan jaminan bahwa setiap instrumen diagnostik dan reagen medis tiba di fasilitas kesehatan dalam kondisi presisi prima.

PT Somaro Medika Utama menerapkan pelacakan rantai pasok berbasis sensor suhu real-time serta uji fungsi menyeluruh oleh teknisi elektromedis bersertifikat sebelum serah terima di rumah sakit.`,
    thumbnail_url:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    author_name: 'Divisi Kepatuhan Alkes',
    is_published: true,
    published_at: '2026-04-14T15:45:00Z',
    created_at: '2026-04-14T15:45:00Z',
  },
];

export const initialInquiries: PartnerInquiry[] = [
  {
    id: 'inq-1',
    full_name: 'dr. Hendra Pratama, Sp.B',
    company_name: 'Mitra Husada Healthcare Group',
    email: 'hendra.pratama@mitrahusada.id',
    phone: '+62 812-3456-7890',
    service_interest: 'Hospital & Klinik Utama',
    message:
      'Tertarik menjajaki kemitraan rujukan spesialis bedah dan kerja sama penggunaan fasilitas kamar operasi modular modern.',
    status: 'unread',
    admin_notes: 'Jadwalkan pertemuan daring dengan Direktur Pelayanan Medis minggu ini.',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'inq-2',
    full_name: 'Clarissa Natalia',
    company_name: 'Aura Radiance Cosmetics Ltd',
    email: 'clarissa@auraradiance.com',
    phone: '+62 818-9876-5432',
    service_interest: 'Maklon Farmasi, Skincare & Kosmetik',
    message:
      'Kami merencanakan peluncuran rangkaian serum pencerah berbahan aktif paten. Membutuhkan estimasi MOQ dan waktu registrasi BPOM.',
    status: 'contacted',
    admin_notes: 'Katalog MOQ dan alur R&D formulasi sudah dikirimkan via email oleh tim Maklon.',
    created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'inq-3',
    full_name: 'Bambang Trihatmojo, S.T.',
    company_name: 'RSUD Graha Medika Prima',
    email: 'bambang.t@grahamedika.go.id',
    phone: '+62 811-2233-4455',
    service_interest: 'Pengadaan Alat Kesehatan & Mesin',
    message:
      'Pengadaan instrumen sterilisasi autoklaf sentral dan sistem monitoring ICU untuk renovasi gedung baru.',
    status: 'resolved',
    admin_notes: 'Proposal penawaran resmi telah disepakati dan masuk tahap verifikasi CDAKB.',
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];
