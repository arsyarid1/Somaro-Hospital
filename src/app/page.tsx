'use client';

import React, { useState, useEffect, useRef } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  HeartPulse,
  FlaskConical,
  Activity,
  Clock,
  MapPin,
  ChevronRight,
  Search,
  Mic,
} from 'lucide-react';
import { initialServices, initialArticles, initialSiteContents } from '@/lib/mock-data';
import { SiteContent } from '@/types';

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HomePage() {
  const router = useRouter();
  const pillars = initialServices;
  const articles = initialArticles;

  // Dynamic CMS State for Hero Section
  const [heroContent, setHeroContent] = useState<SiteContent>(initialSiteContents.hero);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Slider Refs & Scroll States
  const eventSliderRef = useRef<HTMLDivElement>(null);
  const newsSliderRef = useRef<HTMLDivElement>(null);
  const [eventCanScrollLeft, setEventCanScrollLeft] = useState(false);
  const [newsCanScrollLeft, setNewsCanScrollLeft] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadCMSHero() {
      try {
        const res = await fetch('/api/cms?key=hero');
        const data = await res.json();
        if (data.data) {
          setHeroContent(data.data);
        }
      } catch (err) {
        console.warn('Using default hero content fallback', err);
      }
    }
    loadCMSHero();
  }, []);

  const handleSliderScroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: 'left' | 'right',
    setCanScrollLeft: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!ref.current) return;
    const firstCard = ref.current.firstElementChild as HTMLElement | null;
    const scrollAmount = firstCard ? firstCard.offsetWidth + 24 : 404;
    const nextScrollLeft =
      direction === 'left'
        ? ref.current.scrollLeft - scrollAmount
        : ref.current.scrollLeft + scrollAmount;
    ref.current.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });
    setTimeout(() => {
      if (ref.current) {
        setCanScrollLeft(ref.current.scrollLeft > 10);
      }
    }, 350);
  };

  const meta = heroContent.metadata || {};
  const mediaType = meta.media_type || 'image';
  const mediaUrl =
    meta.media_url ||
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=85';
  const posterUrl =
    meta.poster_url ||
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=85';

  // Quick directory items for the interactive search bar
  const searchableItems = [
    { title: 'Dokter Spesialis & Layanan Rumah Sakit', category: 'Hospital & Klinik', href: '/unit-bisnis/hospital' },
    { title: 'IGD 24 Jam & Intensive Care Unit (ICU/NICU)', category: 'Hospital & Klinik', href: '/unit-bisnis/hospital' },
    { title: 'Maklon Skincare, Kosmetik & Farmasi (OEM/ODM)', category: 'Maklon & Distribusi', href: '/unit-bisnis/maklon-farmasi' },
    { title: 'Pengadaan Alat Kesehatan & Diagnostik MRI/CT', category: 'Alat Kesehatan', href: '/unit-bisnis/alat-kesehatan' },
    { title: 'Lokasi Fasilitas & Profil PT Somaro Medika Utama', category: 'Lokasi & Profil', href: '/tentang-kami' },
    { title: 'Janji Temu Medis & Telemedisin Spesialis', category: 'Layanan Rumah Sakit', href: '/unit-bisnis/hospital' },
    { title: 'Berita Kesehatan & Kepatuhan Regulasi Kemenkes/BPOM', category: 'Berita & Regulasi', href: '/berita' },
  ];

  const filteredSuggestions = searchQuery.trim()
    ? searchableItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (filteredSuggestions.length > 0) {
      router.push(filteredSuggestions[0].href);
    } else {
      router.push('/unit-bisnis/hospital');
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      typeof window !== 'undefined' &&
      ((window as unknown as Record<string, unknown>).SpeechRecognition ||
        (window as unknown as Record<string, unknown>).webkitSpeechRecognition);

    if (SpeechRecognition) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recognition = new (SpeechRecognition as any)();
        recognition.lang = 'id-ID';
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const transcript = event.results?.[0]?.[0]?.transcript || '';
          setSearchQuery(transcript);
          setShowSuggestions(true);
        };
        recognition.start();
      } catch {
        setIsListening(false);
        searchInputRef.current?.focus();
      }
    } else {
      searchInputRef.current?.focus();
    }
  };

  const philosophies = [
    {
      symbol: 'Shòu (Sō)',
      name: 'Keberlanjutan & Inovasi',
      pilar: 'Hospital & Klinik Utama',
      icon: HeartPulse,
      desc: 'Mendedikasikan pelayanan klinis berstandar internasional yang menempatkan keselamatan pasien dan kelangsungan hidup sebagai prioritas tertinggi dengan rekam medis terpadu.',
    },
    {
      symbol: 'Mǎn (Ma)',
      name: 'Kesempurnaan & Ketulusan',
      pilar: 'Maklon Farmasi & Estetika',
      icon: FlaskConical,
      desc: 'Menghadirkan formulasi produk kecantikan dan farmasi berstandar CPOB/CPKB mutlak dengan komitmen ketulusan riset demi kepuasan mitra pemilik merek.',
    },
    {
      symbol: 'Lù (Rō)',
      name: 'Kemitraan Global & Modern',
      pilar: 'Pengadaan Alat Kesehatan',
      icon: Activity,
      desc: 'Membangun sinergi global untuk mendistribusikan teknologi diagnostik dan instrumentasi medis termutakhir yang berpresisi tinggi dan tersertifikasi resmi Kemenkes RI.',
    },
  ];

  const upcomingEvents = [
    {
      id: 'evt-1',
      month: 'NOV',
      day: '24',
      title: 'Simposium Kardiovaskular & Bedah Minimal Invasif – 24 November',
      time: '08:30 – 16:00 WIB',
      location: 'Grand Auditorium Somaro Hospital, Jakarta Selatan',
    },
    {
      id: 'evt-2',
      month: 'DES',
      day: '08',
      title: 'Workshop Formulasi Dermokosmetik & Regulasi CPKB BPOM',
      time: '09:30 – 15:00 WIB',
      location: 'Somaro R&D Cleanroom Facility, Tangerang',
    },
    {
      id: 'evt-3',
      month: 'DES',
      day: '19',
      title: 'Edukasi Deteksi Dini Onkologi & Konsultasi Spesialis Gratis',
      time: '09:00 – 13:30 WIB',
      location: 'Poliklinik Terpadu Somaro Hospital, Lantai 3',
    },
    {
      id: 'evt-4',
      month: 'JAN',
      day: '16',
      title: 'Eksibisi Inovasi Diagnostik AI & Kalibrasi Instrumen Medis',
      time: '10:00 – 17:00 WIB',
      location: 'Main Exhibition Hall, Somaro Medical Tower',
    },
    {
      id: 'evt-5',
      month: 'FEB',
      day: '05',
      title: 'Seminar Nasional Manajemen Mutu Rumah Sakit KARS Paripurna',
      time: '13:00 – 16:30 WIB',
      location: 'Virtual / Telekonferensi Medis Somaro',
    },
    {
      id: 'evt-6',
      month: 'FEB',
      day: '21',
      title: 'Forum Kemitraan Riset Bahan Aktif Skincare Klinis Tropis',
      time: '09:30 – 14:30 WIB',
      location: 'Somaro Tower Penthouse Suite, DKI Jakarta',
    },
  ];

  return (
    <div className="relative overflow-x-clip min-w-0">
      {/* =========================================================================
          1. HERO SECTION: FULL SCREEN MEDIA (PHOTO / VIDEO FROM CMS)
      ========================================================================= */}
      <section className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-stone-950">
        {/* Full-Screen Media Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          {mediaType === 'video' ? (
            <video
              ref={videoRef}
              src={mediaUrl}
              poster={posterUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={mediaUrl}
              alt={heroContent.title}
              fill
              className="object-cover"
              priority
            />
          )}
          {/* Subtle Luxury Gradient Overlays for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-[#2A170D]/80" />
        </div>

        {/* Centered Full-Screen Headline & Subtitle Only */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center pt-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-md">
            {heroContent.title}
          </h1>

          <p className="mt-6 text-[22px] text-stone-100/95 leading-[1.5] max-w-3xl mx-auto font-normal drop-shadow">
            {heroContent.content_body}
          </p>
        </motion.div>
      </section>

      {/* =========================================================================
          2. QUICK FINDER & KEYWORD SEARCH SECTION ("What can we help you find?")
      ========================================================================= */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative py-20 sm:py-24 bg-[#3D2314] text-white overflow-hidden"
      >
        {/* Subtle Two-Tone Horizon Wave Background */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55%] bg-[#492A18] pointer-events-none"
          style={{
            clipPath: 'ellipse(85% 100% at 50% 100%)',
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main Heading (36px, weight 700, line-height 1.3) */}
          <h2 className="text-[36px] font-bold leading-[1.3] tracking-tight text-white text-center mb-12 sm:mb-14">
            Apa yang dapat kami bantu temukan?
          </h2>

          {/* 4 White Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Doctors */}
            <NextLink
              href="/unit-bisnis/hospital"
              className="bg-white rounded-2xl p-8 sm:p-9 shadow-[0_14px_34px_rgba(0,0,0,0.22)] hover:shadow-[0_20px_44px_rgba(0,0,0,0.32)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[240px] group"
            >
              <div className="w-24 h-24 flex items-center justify-center mb-5">
                <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
                  <path
                    d="M26 32C26 21.5 32 15 40 15C48 15 54 21.5 54 32C54 37 55.5 41 57 43H23C24.5 41 26 37 26 32Z"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M31 28C34 25 38 23 40 20C42 23 46 25 49 28"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M31 29V33C31 38.5 35 43 40 43C45 43 49 38.5 49 33V29"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 66V54C21 48.5 25.5 45 31 45H49C54.5 45 59 48.5 59 54V66H21Z"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M33 45L40 57L47 45"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="27"
                    y="55"
                    width="9"
                    height="6"
                    rx="1"
                    stroke="#3D2314"
                    strokeWidth="2.2"
                  />
                  <circle cx="40" cy="57" r="3.5" fill="#E59A23" />
                </svg>
              </div>
              <span className="text-[22px] font-bold leading-[1.3] text-[#3D2314] group-hover:underline underline-offset-4 decoration-2">
                Dokter & Spesialis
              </span>
            </NextLink>

            {/* Card 2: Locations */}
            <NextLink
              href="/tentang-kami"
              className="bg-white rounded-2xl p-8 sm:p-9 shadow-[0_14px_34px_rgba(0,0,0,0.22)] hover:shadow-[0_20px_44px_rgba(0,0,0,0.32)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[240px] group"
            >
              <div className="w-24 h-24 flex items-center justify-center mb-5">
                <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
                  <ellipse
                    cx="40"
                    cy="64"
                    rx="15"
                    ry="4.5"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                  />
                  <path
                    d="M40 61C40 61 57 44.5 57 31C57 21.6 49.4 14 40 14C30.6 14 23 21.6 23 31C23 44.5 40 61 40 61Z"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="40"
                    cy="31"
                    r="10"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                  />
                  <path
                    d="M40 26.5V35.5M35.5 31H44.5"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <circle cx="40" cy="61" r="3.5" fill="#E59A23" />
                </svg>
              </div>
              <span className="text-[22px] font-bold leading-[1.3] text-[#3D2314] group-hover:underline underline-offset-4 decoration-2">
                Lokasi & Fasilitas
              </span>
            </NextLink>

            {/* Card 3: Programs & Services */}
            <NextLink
              href="#ekosistem-bento"
              className="bg-white rounded-2xl p-8 sm:p-9 shadow-[0_14px_34px_rgba(0,0,0,0.22)] hover:shadow-[0_20px_44px_rgba(0,0,0,0.32)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[240px] group"
            >
              <div className="w-24 h-24 flex items-center justify-center mb-5">
                <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
                  <path
                    d="M40 64C40 64 16 47 16 29.5C16 21.5 22.2 15.5 29.8 15.5C34.4 15.5 38.2 17.8 40 21.2C41.8 17.8 45.6 15.5 50.2 15.5C57.8 15.5 64 21.5 64 29.5C64 47 40 64 40 64Z"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="40"
                    cy="37"
                    r="10"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                  />
                  <path
                    d="M40 32.5V41.5M35.5 37H44.5"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <circle cx="59.5" cy="20" r="3.5" fill="#E59A23" />
                </svg>
              </div>
              <span className="text-[22px] font-bold leading-[1.3] text-[#3D2314] group-hover:underline underline-offset-4 decoration-2">
                Program & Layanan
              </span>
            </NextLink>

            {/* Card 4: Appointments & Video Visits */}
            <NextLink
              href="/unit-bisnis/hospital"
              className="bg-white rounded-2xl p-8 sm:p-9 shadow-[0_14px_34px_rgba(0,0,0,0.22)] hover:shadow-[0_20px_44px_rgba(0,0,0,0.32)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[240px] group"
            >
              <div className="w-24 h-24 flex items-center justify-center mb-5">
                <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20">
                  <rect
                    x="16"
                    y="18"
                    width="48"
                    height="38"
                    rx="3"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                  />
                  <path
                    d="M16 49H64"
                    stroke="#3D2314"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M40 56V64M30 64H50"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="40"
                    cy="25"
                    r="8"
                    fill="white"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                  />
                  <path
                    d="M33 23C35.5 24.5 38.5 25 40 23C41.5 25 44.5 24.5 47 23"
                    stroke="#3D2314"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M27 49V41C27 36.5 31 34 35.5 34H44.5C49 34 53 36.5 53 41V49"
                    stroke="#3D2314"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M34 34V41C34 42.5 35.5 44 37 44M46 34V42"
                    stroke="#3D2314"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <circle cx="46" cy="43.5" r="2" stroke="#3D2314" strokeWidth="2" />
                  <circle cx="40" cy="49" r="3.5" fill="#E59A23" />
                </svg>
              </div>
              <span className="text-[22px] font-bold leading-[1.3] text-[#3D2314] group-hover:underline underline-offset-4 decoration-2">
                Janji Temu & Telemedisin
              </span>
            </NextLink>
          </div>

          {/* Bottom Search Prompt & Voice + Keyword Search Bar */}
          <div className="mt-14 sm:mt-16 text-center">
            <div className="text-[22px] font-bold text-white mb-6">
              Atau, cari sesuatu yang lain?
            </div>

            <div className="max-w-lg mx-auto relative">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center justify-center gap-3.5"
              >
                {/* Microphone / Voice Search Button */}
                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  title="Pencarian Suara"
                  aria-label="Pencarian Suara"
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg transition-all duration-200 ${
                    isListening
                      ? 'bg-[#E59A23] text-[#26140A] scale-110 animate-pulse'
                      : 'bg-[#24130A] hover:bg-[#190D06] text-white hover:scale-105'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>

                {/* White Pill Keyword Input */}
                <div className="relative flex-1">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder="Masukkan Kata Kunci"
                    className="w-full h-12 pl-6 pr-12 rounded-full bg-white text-[#3D2314] placeholder:text-stone-500 text-[16px] font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-[#C8B195]"
                  />
                  <button
                    type="submit"
                    aria-label="Cari"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3D2314] hover:text-[#5C3A21] transition-colors"
                  >
                    <Search className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              </form>

              {/* Interactive Live Search Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute left-0 sm:left-16 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-somaro-khaki-light/60 overflow-hidden z-30 text-left">
                  {filteredSuggestions.map((item, idx) => (
                    <NextLink
                      key={idx}
                      href={item.href}
                      className="flex items-center justify-between px-5 py-3.5 hover:bg-somaro-khaki-soft/50 transition-colors border-b last:border-b-0 border-stone-100"
                    >
                      <div>
                        <div className="text-[16px] font-bold text-[#3D2314]">{item.title}</div>
                        <div className="text-[14px] text-stone-500">{item.category}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#3D2314] shrink-0" />
                    </NextLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* =========================================================================
          3. BENTO GRID: 3 BUSINESS PILLARS (Hallmark Macrostructure 01)
      ========================================================================= */}
      <motion.section
        id="ekosistem-bento"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="py-24 bg-white relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[14px] font-bold tracking-widest text-somaro-khaki-dark uppercase block">
              Portofolio Terintegrasi
            </span>
            <h2 className="text-[36px] font-bold leading-[1.3] tracking-tight text-somaro-brown">
              Tiga Pilar Utama Holding Somaro
            </h2>
            <p className="text-[16px] text-stone-600 leading-[1.65]">
              Sinergi harmonis antara fasilitas klinis, manufaktur formulasi kosmetika dan farmasi, 
              serta pengadaan teknologi alat kesehatan presisi tinggi.
            </p>
          </div>

          {/* Bento Grid Layout: 1 Hero Spotlight + 2 Precision Grid Tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Tile 1 (Hero Spotlight): Somaro Hospital & Klinik Utama (Spans 7 cols) */}
            <div className="lg:col-span-7 rounded-3xl glass-apple-card border border-somaro-khaki-light/60 overflow-hidden shadow-apple hover:shadow-apple-hover transition-all duration-300 flex flex-col group">
              <div className="h-64 sm:h-72 relative overflow-hidden bg-stone-100">
                <Image
                  src={pillars[0].image_url}
                  alt={pillars[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 p-3 rounded-2xl bg-white/95 backdrop-blur-md text-somaro-brown shadow-sm flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-somaro-brown" />
                  <span className="text-[14px] font-bold">Pilar 1 • Layanan Klinis</span>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-[22px] font-bold leading-[1.3] text-somaro-brown group-hover:text-somaro-brown-medium transition-colors">
                    {pillars[0].title}
                  </h3>
                  <p className="text-[16px] text-stone-600 leading-[1.65]">
                    {pillars[0].description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <div className="p-4 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light/40">
                      <div className="text-[14px] font-bold text-somaro-brown">Kapasitas Tempat Tidur</div>
                      <div className="text-[14px] text-stone-600 mt-0.5">250+ Bed VVIP & Eksekutif</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light/40">
                      <div className="text-[14px] font-bold text-somaro-brown">Akreditasi & Integrasi</div>
                      <div className="text-[14px] text-stone-600 mt-0.5">KARS Paripurna & SatuSehat</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-somaro-khaki-light/40 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {pillars[0].standards.map((st, i) => (
                      <span key={i} className="px-3 py-1 rounded-md text-[14px] font-semibold bg-somaro-khaki-soft text-somaro-brown border border-somaro-khaki-light/60">
                        {st}
                      </span>
                    ))}
                  </div>

                  <NextLink
                    href="/unit-bisnis/hospital"
                    className="inline-flex items-center gap-1.5 text-[14px] font-bold text-somaro-brown hover:text-somaro-brown-medium group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Fasilitas Medis</span>
                    <ArrowRight className="w-4 h-4 text-somaro-khaki" />
                  </NextLink>
                </div>
              </div>
            </div>

            {/* Right Column Stack: Tiles 2 & 3 (Spans 5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Tile 2: Maklon Farmasi & Kosmetik (OEM/ODM) */}
              <div className="rounded-3xl glass-apple-card border border-somaro-khaki-light/60 p-7 shadow-apple hover:shadow-apple-hover transition-all duration-300 flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-2xl bg-somaro-khaki-soft text-somaro-brown">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <span className="text-[14px] font-bold uppercase tracking-wider text-somaro-khaki-dark px-3 py-1 rounded-full bg-somaro-khaki-soft">
                      Pilar 2 • OEM / ODM
                    </span>
                  </div>

                  <h3 className="text-[22px] font-bold leading-[1.3] text-somaro-brown group-hover:text-somaro-brown-medium transition-colors">
                    {pillars[1].title}
                  </h3>
                  <p className="text-[16px] text-stone-600 leading-[1.65] line-clamp-3">
                    {pillars[1].summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-somaro-khaki-light/40 flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-stone-500">
                    Kapasitas: 5 Juta+ unit/bulan
                  </span>
                  <NextLink
                    href="/unit-bisnis/maklon-farmasi"
                    className="inline-flex items-center gap-1 text-[14px] font-bold text-somaro-brown hover:underline"
                  >
                    <span>Alur Maklon</span>
                    <ArrowRight className="w-4 h-4 text-somaro-khaki" />
                  </NextLink>
                </div>
              </div>

              {/* Tile 3: Pengadaan Alat Kesehatan & Mesin Manufaktur */}
              <div className="rounded-3xl glass-apple-card border border-somaro-khaki-light/60 p-7 shadow-apple hover:shadow-apple-hover transition-all duration-300 flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-2xl bg-somaro-khaki-soft text-somaro-brown">
                      <Activity className="w-5 h-5" />
                    </div>
                    <span className="text-[14px] font-bold uppercase tracking-wider text-somaro-khaki-dark px-3 py-1 rounded-full bg-somaro-khaki-soft">
                      Pilar 3 • Biomedika
                    </span>
                  </div>

                  <h3 className="text-[22px] font-bold leading-[1.3] text-somaro-brown group-hover:text-somaro-brown-medium transition-colors">
                    {pillars[2].title}
                  </h3>
                  <p className="text-[16px] text-stone-600 leading-[1.65] line-clamp-3">
                    {pillars[2].summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-somaro-khaki-light/40 flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-stone-500">
                    Sertifikasi: AKL/AKD Kemenkes
                  </span>
                  <NextLink
                    href="/unit-bisnis/alat-kesehatan"
                    className="inline-flex items-center gap-1 text-[14px] font-bold text-somaro-brown hover:underline"
                  >
                    <span>Katalog Mesin</span>
                    <ArrowRight className="w-4 h-4 text-somaro-khaki" />
                  </NextLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* =========================================================================
          4. CORE VALUES: PHILOSOPHY BREAKDOWN (Shòu, Mǎn, Lù)
      ========================================================================= */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="py-24 bg-somaro-surface-subtle border-y border-somaro-khaki-light/40 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[14px] font-bold tracking-widest text-somaro-khaki-dark uppercase block">
              Visi & Nilai Inti
            </span>
            <h2 className="text-[36px] font-bold leading-[1.3] tracking-tight text-somaro-brown">
              Filosofi Holding: Shòu, Mǎn, & Lù
            </h2>
            <p className="text-[16px] text-stone-600 leading-[1.65]">
              Prinsip kepemimpinan dan etika kerja yang memandu setiap langkah pelayanan dan tata kelola medis kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophies.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 sm:p-9 rounded-3xl bg-white border border-somaro-khaki-light/60 shadow-apple flex flex-col justify-between space-y-6 hover:shadow-apple-hover transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-somaro-brown flex items-center justify-center text-somaro-khaki shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[14px] font-bold font-serif tracking-wider text-somaro-brown px-3.5 py-1 rounded-full bg-somaro-khaki-soft border border-somaro-khaki-light">
                        {item.symbol}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-[22px] font-bold leading-[1.3] text-somaro-brown">{item.name}</h3>
                      <div className="text-[14px] font-semibold text-somaro-khaki-dark uppercase tracking-wider mt-1">
                        {item.pilar}
                      </div>
                    </div>

                    <p className="text-[16px] text-stone-600 leading-[1.65]">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-somaro-khaki-light/30 text-[14px] text-stone-500 font-medium">
                    Tata Kelola Medis Berstandar Internasional
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* =========================================================================
          5. UPCOMING EVENTS SLIDER (Large Circular Date Badge, No Photo, Slider Nav)
      ========================================================================= */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="py-24 bg-[#F3F4F6] border-b border-somaro-khaki-light/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left-Aligned Section Heading (matching attachment) */}
          <h2 className="text-[36px] font-bold leading-[1.3] tracking-tight text-somaro-brown mb-10">
            Agenda & Event Mendatang
          </h2>

          {/* Horizontal Slider Track */}
          <div
            ref={eventSliderRef}
            onScroll={() => {
              if (eventSliderRef.current) {
                setEventCanScrollLeft(eventSliderRef.current.scrollLeft > 10);
              }
            }}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
          >
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="w-full max-w-[380px] sm:w-[380px] flex-shrink-0 rounded-2xl bg-white p-8 shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_34px_rgba(61,35,20,0.12)] transition-all duration-300 flex flex-col justify-between min-h-[370px] border border-stone-200/70"
              >
                <div>
                  {/* Large Circular Date Badge (Top Left, No Photo) */}
                  <div className="w-24 h-24 rounded-full bg-somaro-khaki-soft/85 flex flex-col items-center justify-center text-center mb-7">
                    <span className="text-[14px] font-bold uppercase tracking-wider text-somaro-brown leading-none">
                      {evt.month}
                    </span>
                    <span className="text-[36px] font-bold text-somaro-brown leading-none mt-1">
                      {evt.day}
                    </span>
                  </div>

                  {/* Event Subtitle (22px) */}
                  <h3 className="text-[22px] font-bold leading-[1.3] text-somaro-brown">
                    {evt.title}
                  </h3>
                </div>

                {/* Bottom Time & Location Details (14px) */}
                <div className="pt-8 space-y-3 text-[14px] text-stone-700">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-somaro-brown shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-somaro-brown shrink-0 mt-0.5" />
                    <span className="leading-snug">{evt.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Navigation Controls (Bottom Left, matching attachment) */}
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSliderScroll(eventSliderRef, 'left', setEventCanScrollLeft)}
              aria-label="Event Sebelumnya"
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                eventCanScrollLeft
                  ? 'bg-somaro-brown text-white hover:bg-somaro-brown-hover shadow-md'
                  : 'bg-somaro-khaki-light/80 text-white hover:bg-somaro-khaki-dark'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => handleSliderScroll(eventSliderRef, 'right', setEventCanScrollLeft)}
              aria-label="Event Selanjutnya"
              className="w-12 h-12 rounded-full bg-somaro-brown hover:bg-somaro-brown-hover text-white flex items-center justify-center shadow-md transition-all duration-200"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            <NextLink
              href="/berita"
              className="ml-4 px-8 h-12 rounded-full bg-somaro-brown hover:bg-somaro-brown-hover text-white text-[14px] font-bold inline-flex items-center justify-center shadow-md transition-all duration-200"
            >
              Lihat Semua Event
            </NextLink>
          </div>
        </div>
      </motion.section>

      {/* =========================================================================
          6. NEWS & REGULATORY UPDATES SLIDER (Same Slider Layout as Events, WITH Photo)
      ========================================================================= */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left-Aligned Section Heading */}
          <h2 className="text-[36px] font-bold leading-[1.3] tracking-tight text-somaro-brown mb-10">
            Berita & Kepatuhan Regulasi
          </h2>

          {/* Horizontal Slider Track */}
          <div
            ref={newsSliderRef}
            onScroll={() => {
              if (newsSliderRef.current) {
                setNewsCanScrollLeft(newsSliderRef.current.scrollLeft > 10);
              }
            }}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
          >
            {articles.map((article) => (
              <NextLink
                key={article.id}
                href={`/berita/${article.slug}`}
                className="w-full max-w-[380px] sm:w-[380px] flex-shrink-0 group rounded-2xl overflow-hidden bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_34px_rgba(61,35,20,0.12)] transition-all duration-300 flex flex-col justify-between border border-stone-200/70"
              >
                {/* Photo Header */}
                <div className="h-52 relative overflow-hidden bg-stone-100">
                  <Image
                    src={article.thumbnail_url}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[14px] font-bold text-somaro-brown shadow-sm">
                    {article.category}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-7 flex-grow flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <h3 className="text-[22px] font-bold leading-[1.3] text-somaro-brown group-hover:text-somaro-brown-medium transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-[16px] text-stone-600 line-clamp-2 leading-[1.65]">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-somaro-khaki-light/40 flex items-center justify-between text-[14px] text-stone-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-somaro-khaki-dark" />
                      <span>{article.author_name}</span>
                    </div>
                    <span className="font-bold text-somaro-brown group-hover:underline flex items-center gap-1">
                      Baca <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </NextLink>
            ))}
          </div>

          {/* Slider Navigation Controls (Bottom Left, matching Event slider) */}
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSliderScroll(newsSliderRef, 'left', setNewsCanScrollLeft)}
              aria-label="Berita Sebelumnya"
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                newsCanScrollLeft
                  ? 'bg-somaro-brown text-white hover:bg-somaro-brown-hover shadow-md'
                  : 'bg-somaro-khaki-light/80 text-white hover:bg-somaro-khaki-dark'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => handleSliderScroll(newsSliderRef, 'right', setNewsCanScrollLeft)}
              aria-label="Berita Selanjutnya"
              className="w-12 h-12 rounded-full bg-somaro-brown hover:bg-somaro-brown-hover text-white flex items-center justify-center shadow-md transition-all duration-200"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            <NextLink
              href="/berita"
              className="ml-4 px-8 h-12 rounded-full bg-somaro-brown hover:bg-somaro-brown-hover text-white text-[14px] font-bold inline-flex items-center justify-center shadow-md transition-all duration-200"
            >
              Lihat Semua Berita
            </NextLink>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
