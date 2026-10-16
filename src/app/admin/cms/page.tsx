'use client';

import React, { useState, useEffect } from 'react';
import {
  Sliders,
  Save,
  CheckCircle2,
  Sparkles,
  Video,
  Image as ImageIcon,
  Play,
  RotateCcw,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { SiteContent } from '@/types';

export default function AdminCMSPage() {
  const [heroTitle, setHeroTitle] = useState('Inovasi Medis Terpadu & Ekosistem Kesehatan Masa Depan');
  const [heroSubtitle, setHeroSubtitle] = useState('PT Somaro Medika Utama');
  const [heroBody, setHeroBody] = useState(
    'Holding kesehatan terkemuka yang mengintegrasikan keunggulan rumah sakit, manufaktur maklon farmasi & estetika, serta teknologi alat kesehatan berstandar regulasi tertinggi.'
  );
  const [badgeText, setBadgeText] = useState('Integrated Healthcare Holding Group');
  const [ctaPrimary, setCtaPrimary] = useState('Mulai Kemitraan Korporat');
  const [ctaSecondary, setCtaSecondary] = useState('Eksplorasi 3 Pilar Bisnis');

  // Media controls (Photo or Video for Hero)
  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const [mediaUrl, setMediaUrl] = useState(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );
  const [posterUrl, setPosterUrl] = useState(
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80'
  );
  const [mediaCaption, setMediaCaption] = useState(
    'Fasilitas Bedah Modular & Cleanroom Manufaktur CPOB'
  );

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function fetchHero() {
      try {
        const res = await fetch('/api/cms?key=hero');
        const data = await res.json();
        if (data.data) {
          const content: SiteContent = data.data;
          setHeroTitle(content.title);
          if (content.subtitle) setHeroSubtitle(content.subtitle);
          setHeroBody(content.content_body);
          if (content.metadata?.badge) setBadgeText(content.metadata.badge);
          if (content.metadata?.cta_primary) setCtaPrimary(content.metadata.cta_primary);
          if (content.metadata?.cta_secondary) setCtaSecondary(content.metadata.cta_secondary);
          if (content.metadata?.media_type) setMediaType(content.metadata.media_type);
          if (content.metadata?.media_url) setMediaUrl(content.metadata.media_url);
          if (content.metadata?.poster_url) setPosterUrl(content.metadata.poster_url);
          if (content.metadata?.media_caption) setMediaCaption(content.metadata.media_caption);
        }
      } catch (err) {
        console.error('Failed to load CMS content', err);
      }
    }
    fetchHero();
  }, []);

  const handleApplyPreset = (type: 'video' | 'image', url: string, poster: string, caption: string) => {
    setMediaType(type);
    setMediaUrl(url);
    setPosterUrl(poster);
    setMediaCaption(caption);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section_key: 'hero',
          title: heroTitle,
          subtitle: heroSubtitle,
          content_body: heroBody,
          metadata: {
            badge: badgeText,
            cta_primary: ctaPrimary,
            cta_secondary: ctaSecondary,
            media_type: mediaType,
            media_url: mediaUrl,
            poster_url: posterUrl,
            media_caption: mediaCaption,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-somaro-brown">
          CMS Pengaturan Hero Section & Media Visual
        </h1>
        <p className="text-xs text-stone-500">
          Ubah latar dan showcase Hero secara instan antara Video Sinematik atau Foto Resolusi Tinggi, serta sunting teks narasi holding.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in duration-200 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Pengaturan Hero & Media Visual berhasil disimpan dan langsung diperbarui pada website publik!</span>
        </div>
      )}

      {/* Main CMS Editor Form */}
      <form onSubmit={handleSave} className="space-y-8">
        {/* SECTION 1: HERO MEDIA (PHOTO / VIDEO) */}
        <div className="p-8 rounded-3xl bg-white border border-somaro-khaki-light/60 shadow-apple space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-somaro-khaki-soft text-somaro-brown">
                {mediaType === 'video' ? <Video className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-base font-bold text-somaro-brown">
                  Visual Media Hero (Foto atau Video)
                </h3>
                <p className="text-[11px] text-stone-500">
                  Tentukan tipe media visual yang ditampilkan di sisi kanan Hero Section beranda.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full border border-stone-200 text-xs">
              <button
                type="button"
                onClick={() => setMediaType('video')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                  mediaType === 'video'
                    ? 'bg-somaro-brown text-white shadow-sm'
                    : 'text-stone-600 hover:text-somaro-brown'
                }`}
              >
                <Video className="w-3.5 h-3.5" /> Video Sinematik
              </button>
              <button
                type="button"
                onClick={() => setMediaType('image')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                  mediaType === 'image'
                    ? 'bg-somaro-brown text-white shadow-sm'
                    : 'text-stone-600 hover:text-somaro-brown'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" /> Foto High-Res
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-somaro-khaki-dark block">
              Pilihan Cepat (Preset Siap Pakai):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() =>
                  handleApplyPreset(
                    'video',
                    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80',
                    'Fasilitas Bedah Modular & Cleanroom Manufaktur CPOB'
                  )
                }
                className={`p-3 rounded-2xl border text-left transition-all ${
                  mediaType === 'video'
                    ? 'border-somaro-brown bg-somaro-khaki-soft/40'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="font-bold text-somaro-brown flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-somaro-brown" /> Video Laboratorium
                </div>
                <div className="text-[10px] text-stone-500 mt-1">MP4 Streaming Medis Berputar Otomatis</div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleApplyPreset(
                    'image',
                    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80',
                    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80',
                    'Somaro Hospital & Jaringan Klinik Paripurna'
                  )
                }
                className={`p-3 rounded-2xl border text-left transition-all ${
                  mediaType === 'image' && mediaUrl.includes('photo-1519494026892')
                    ? 'border-somaro-brown bg-somaro-khaki-soft/40'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="font-bold text-somaro-brown flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-somaro-brown" /> Foto Rumah Sakit
                </div>
                <div className="text-[10px] text-stone-500 mt-1">Fasilitas Modern Eksekutif</div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleApplyPreset(
                    'image',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80',
                    'Cleanroom Kelas 10.000 & R&D Formulasi CPOB'
                  )
                }
                className={`p-3 rounded-2xl border text-left transition-all ${
                  mediaType === 'image' && mediaUrl.includes('photo-1582719478250')
                    ? 'border-somaro-brown bg-somaro-khaki-soft/40'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="font-bold text-somaro-brown flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-somaro-brown" /> Foto Manufaktur CPOB
                </div>
                <div className="text-[10px] text-stone-500 mt-1">Laboratorium Maklon Kosmetik/Farmasi</div>
              </button>
            </div>
          </div>

          {/* Media URL Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-somaro-brown">
                {mediaType === 'video' ? 'URL File Video (MP4 / WebM) *' : 'URL File Foto (High-Res Image) *'}
              </label>
              <input
                type="url"
                required
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-somaro-brown">
                URL Poster / Thumbnail Cadangan *
              </label>
              <input
                type="url"
                required
                value={posterUrl}
                onChange={(e) => setPosterUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-somaro-brown">
              Keterangan Label Media (Caption Badge di Bawah Media)
            </label>
            <input
              type="text"
              value={mediaCaption}
              onChange={(e) => setMediaCaption(e.target.value)}
              placeholder="Contoh: Fasilitas Bedah Modular & Cleanroom Manufaktur CPOB"
              className="w-full px-4 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
            />
          </div>

          {/* Live Preview Inside CMS */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Pratinjau Tampilan Media (Live Preview)
              </span>
              <span className="text-[11px] capitalize text-somaro-brown font-bold">
                Mode: {mediaType}
              </span>
            </div>

            <div className="w-full h-64 sm:h-80 rounded-3xl overflow-hidden relative border border-somaro-khaki-light/60 bg-stone-900 shadow-inner flex items-center justify-center">
              {mediaType === 'video' ? (
                <video
                  src={mediaUrl}
                  poster={posterUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={mediaUrl}
                  alt="Preview Hero"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 flex items-center justify-between text-xs text-somaro-brown shadow-sm">
                <span className="font-semibold">{mediaCaption}</span>
                <span className="text-[10px] uppercase font-bold text-somaro-khaki-dark px-2 py-0.5 rounded-full bg-somaro-khaki-soft">
                  {mediaType === 'video' ? 'Video Active' : 'Image Active'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: HERO HEADLINE & TEXT */}
        <div className="p-8 rounded-3xl bg-white border border-somaro-khaki-light/60 shadow-apple space-y-5 text-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
            <div className="p-2 rounded-xl bg-somaro-khaki-soft text-somaro-brown">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-somaro-brown">
                Teks Headline & Narasi Hero
              </h3>
              <p className="text-[11px] text-stone-500">
                Pesan pembuka, tagline holding, dan tombol Call-to-Action.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-somaro-brown">
                Teks Lencana Header (Badge Pill)
              </label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-somaro-brown">
                Nama Perusahaan / Sub-judul
              </label>
              <input
                type="text"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-somaro-brown">
              Judul Utama Hero (Main Headline) *
            </label>
            <textarea
              rows={2}
              required
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-somaro-brown">
              Paragraf Penjelasan Visi Holding *
            </label>
            <textarea
              rows={3}
              required
              value={heroBody}
              onChange={(e) => setHeroBody(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-somaro-brown">
                Teks Tombol Aksi Utama (CTA Primary)
              </label>
              <input
                type="text"
                value={ctaPrimary}
                onChange={(e) => setCtaPrimary(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-somaro-brown">
                Teks Tombol Sekunder (CTA Secondary)
              </label>
              <input
                type="text"
                value={ctaSecondary}
                onChange={(e) => setCtaSecondary(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-somaro-brown hover:bg-somaro-brown-hover text-white text-xs font-bold tracking-wide shadow-apple transition-all disabled:opacity-50 min-h-[44px]"
            >
              <Save className="w-4 h-4 text-somaro-khaki" />
              <span>{saving ? 'Menyimpan Perubahan...' : 'Simpan Pengaturan CMS Hero'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
