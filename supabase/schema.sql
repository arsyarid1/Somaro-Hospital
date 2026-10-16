-- ==============================================================================
-- DATABASE SCHEMA: PT SOMARO MEDIKA UTAMA
-- Relational Database & Row Level Security (RLS) Specification
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE admin_role AS ENUM ('super_admin', 'editor');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE inquiry_status AS ENUM ('unread', 'contacted', 'resolved');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE service_category AS ENUM ('hospital', 'maklon_farmasi', 'alat_kesehatan');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. TABLES DEFINITION
-- ==============================================================================

-- Admin Users Table (linked with Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role admin_role DEFAULT 'editor' NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Site Contents Table (Key-Value CMS Storage for Hero, Tagline, About, etc.)
CREATE TABLE IF NOT EXISTS public.site_contents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    content_body TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    last_updated_by UUID REFERENCES public.admin_users(id),
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Business Services & Products Catalog
CREATE TABLE IF NOT EXISTS public.business_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category service_category NOT NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    specifications JSONB DEFAULT '{}'::jsonb,
    standards TEXT[] DEFAULT '{}',
    is_featured BOOLEAN DEFAULT false NOT NULL,
    order_index INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Articles & Regulations Compliance News
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT DEFAULT 'Berita Medis' NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    thumbnail_url TEXT,
    author_name TEXT DEFAULT 'PT Somaro Medika Utama' NOT NULL,
    is_published BOOLEAN DEFAULT true NOT NULL,
    published_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Partner Inquiries Table (Submissions from Contact Form)
CREATE TABLE IF NOT EXISTS public.partner_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_interest TEXT NOT NULL,
    message TEXT NOT NULL,
    status inquiry_status DEFAULT 'unread' NOT NULL,
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_inquiries ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is an active admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid() AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Site Contents: Public Read, Admin All
CREATE POLICY "Public can view site contents"
    ON public.site_contents FOR SELECT
    USING (true);

CREATE POLICY "Admin can manage site contents"
    ON public.site_contents FOR ALL
    USING (public.is_admin());

-- Business Services: Public Read, Admin All
CREATE POLICY "Public can view business services"
    ON public.business_services FOR SELECT
    USING (true);

CREATE POLICY "Admin can manage business services"
    ON public.business_services FOR ALL
    USING (public.is_admin());

-- Articles: Public Read Published, Admin All
CREATE POLICY "Public can view published articles"
    ON public.articles FOR SELECT
    USING (is_published = true);

CREATE POLICY "Admin can manage all articles"
    ON public.articles FOR ALL
    USING (public.is_admin());

-- Partner Inquiries: Public Insert, Admin All
CREATE POLICY "Public can insert inquiries"
    ON public.partner_inquiries FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admin can view and update inquiries"
    ON public.partner_inquiries FOR ALL
    USING (public.is_admin());

-- Admin Users: Only Super Admin / Self
CREATE POLICY "Admins can view admin users"
    ON public.admin_users FOR SELECT
    USING (public.is_admin());

CREATE POLICY "Super Admins can manage admin users"
    ON public.admin_users FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users
            WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
        )
    );

-- ==============================================================================
-- 5. INITIAL SEED DATA
-- ==============================================================================

-- Site Content Defaults
INSERT INTO public.site_contents (section_key, title, subtitle, content_body, metadata)
VALUES
(
    'hero',
    'Inovasi Medis Terpadu & Ekosistem Kesehatan Masa Depan',
    'PT Somaro Medika Utama',
    'Menjadi holding kesehatan dan medis terdepan, terpercaya, dan berkelanjutan yang mengintegrasikan layanan hospital, maklon dan distribusi farmasi, produk kecantikan estetika, serta teknologi alat kesehatan berstandar regulasi tertinggi.',
    '{"badge": "Leading Healthcare & Medical Holding", "cta_text": "Kemitraan Korporat", "cta_url": "/kontak"}'::jsonb
),
(
    'vision_mission',
    'Visi, Misi & Filosofi Korporat',
    'Pilar Keunggulan Berkelanjutan',
    'Fondasi kami bertumpu pada integritas medis berstandar internasional dan komitmen melayani masyarakat dengan inovasi tiada henti.',
    '{"shou": "Shòu / Sō – Keberlanjutan & Inovasi Layanan Hospital", "man": "Mǎn / Ma – Kesempurnaan & Ketulusan Maklon Farmasi-Kecantikan", "lu": "Lù / Rō – Kemitraan Global Pengadaan Mesin & Alkes Modern"}'::jsonb
)
ON CONFLICT (section_key) DO NOTHING;

-- Business Services Defaults
INSERT INTO public.business_services (category, title, slug, summary, description, image_url, specifications, standards, is_featured, order_index)
VALUES
(
    'hospital',
    'Somaro Hospital & Klinik Utama',
    'hospital-klinik-utama',
    'Fasilitas rawat inap, bedah terpadu, dan poliklinik spesialis dengan akreditasi paripurna dan teknologi medis mutakhir.',
    'Rumah sakit dan jaringan klinik kami mengadopsi standar internasional patient-safety dengan dukungan dokter spesialis terkemuka, fasilitas ICU modern, layanan gawat darurat 24/7, serta sistem rekam medis elektronik terintegrasi.',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    '{"kapasitas_tempat_tidur": "250+ Bed", "layanan_unggulan": "Kardiologi, Onkologi, Bedah Minimal Invasif", "akreditasi": "KARS Paripurna / JCI Ready"}'::jsonb,
    ARRAY['Kemenkes RI', 'KARS Paripurna', 'Standar WHO'],
    true,
    1
),
(
    'maklon_farmasi',
    'Maklon Farmasi, Skincare & Estetika (OEM/ODM)',
    'maklon-farmasi-estetika',
    'Pabrik manufaktur berstandar CPOB & CPKB untuk formulasi skincare medis, kosmetika estetika, dan sediaan farmasi siap edar.',
    'Kami menyediakan layanan manufaktur kontrak menyeluruh (one-stop OEM/ODM): mulai dari riset formulasi di laboratorium R&D, uji stabilitas, registrasi izin edar BPOM, sertifikasi Halal MUI, hingga produksi massal dan desain kemasan mewah.',
    'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    '{"kapasitas_produksi": "5.000.000+ unit/bulan", "fasilitas": "Cleanroom Class 10.000 / Grade C", "layanan": "Formula Kustom, Uji Klinis, Legalitas BPOM"}'::jsonb,
    ARRAY['CPOB BPOM', 'CPKB BPOM', 'Halal BPJPH', 'ISO 22716'],
    true,
    2
),
(
    'alat_kesehatan',
    'Pengadaan Mesin & Alat Kesehatan Mutakhir',
    'pengadaan-alat-kesehatan',
    'Distributor resmi dan perakitan teknologi diagnostik canggih, mesin sterilisasi, serta peralatan bedah rumah sakit.',
    'Divisi alkes kami bermitra dengan produsen global terbaik untuk menyediakan instrumen radiologi (CT-Scan, MRI), ultrasound 4D, mesin anestesi, ventilator ICU, serta mesin produksi formulasi farmasi yang teruji presisinya.',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    '{"kategori_alat": "Radiologi, ICU Care, Instrumentasi Bedah", "garansi_layanan": "Layanan Purna Jual & Kalibrasi Berkala 24/7", "sertifikasi_edar": "AKL / AKD Kemenkes RI"}'::jsonb,
    ARRAY['Izin Edar Kemenkes (AKL/AKD)', 'CDAKB', 'SNI ISO 13485'],
    true,
    3
)
ON CONFLICT (slug) DO NOTHING;

-- Articles Seed Data
INSERT INTO public.articles (title, slug, category, excerpt, content, thumbnail_url, is_published)
VALUES
(
    'Penerapan Standar Baru CPOB 2026 dalam Manufaktur Kosmetik & Farmasi',
    'penerapan-standar-baru-cpob-2026',
    'Regulasi & Kepatuhan',
    'Bagaimana PT Somaro Medika Utama memastikan seluruh lini produksi memenuhi audit ketat BPOM dan regulasi sediaan sediaan klinis.',
    'Dalam lanskap industri kesehatan modern, kepatuhan regulasi bukan sekadar kewajiban hukum, melainkan pondasi kepercayaan pasien dan mitra kerja. PT Somaro Medika Utama telah menerapkan pedoman CPOB (Cara Pembuatan Obat yang Baik) dan CPKB (Cara Pembuatan Kosmetika yang Baik) termutakhir dengan sistem otomasi udara dan pemantauan mikrobiologi real-time...',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    true
),
(
    'Transformasi Digital Layanan Rumah Sakit: Minimalis, Cepat, dan Presisi',
    'transformasi-digital-layanan-rumah-sakit',
    'Inovasi Medis',
    'Evolusi layanan kesehatan berbasis teknologi informasi yang menempatkan kenyamanan serta keselamatan pasien di garda terdepan.',
    'Penerapan rekam medis digital (RME) yang selaras dengan platform SatuSehat Kemenkes menjadi salah satu tonggak utama unit hospital Somaro Medika Utama. Hal ini mempercepat alur penanganan pasien gawat darurat dan memastikan akurasi riwayat klinis dokter.',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    true
),
(
    'Peran Mesin Diagnostik Presisi Tinggi dalam Deteksi Dini Penyakit Kronis',
    'peran-mesin-diagnostik-presisi-tinggi',
    'Teknologi Alkes',
    'Pengadaan peralatan radiologi dan pencitraan medis generasi terbaru untuk mendukung akurasi diagnosis dokter spesialis.',
    'Teknologi pencitraan medis terus berkembang pesat. Dengan menghadirkan unit MRI dan CT-Scan low-dose radiation, PT Somaro Medika Utama membuktikan komitmennya untuk menghadirkan fasilitas diagnostik kelas satu di Indonesia.',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    true
)
ON CONFLICT (slug) DO NOTHING;
