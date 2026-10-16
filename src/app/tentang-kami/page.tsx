'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function TentangKamiPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Header Banner */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-b from-white via-somaro-surface-subtle to-somaro-khaki-soft/30 py-16 border-b border-somaro-khaki-light/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-somaro-khaki-soft border border-somaro-khaki-light text-[14px] font-semibold text-somaro-brown uppercase tracking-wider">
            Profil Korporat
          </div>
          <h1 className="text-[36px] sm:text-5xl font-bold leading-[1.3] text-somaro-brown tracking-tight">
            Tentang PT Somaro Medika Utama
          </h1>
          <p className="text-[22px] text-stone-600 max-w-3xl mx-auto leading-[1.45]">
            Holding layanan kesehatan terpadu yang berdedikasi membangun standar baru mutu klinis,
            inovasi formulasi farmasi & kosmetika estetika, serta teknologi alat kesehatan di Indonesia.
          </p>
        </div>
      </motion.section>

      {/* Visi & Misi Section */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[14px] font-semibold uppercase tracking-widest text-somaro-khaki-dark block">
              Arah Strategis Holding
            </span>
            <h2 className="text-[36px] font-bold leading-[1.3] text-somaro-brown tracking-tight">
              Visi Kami untuk Masa Depan Kesehatan
            </h2>
            <div className="p-7 rounded-3xl bg-white border border-somaro-khaki-light/60 shadow-apple space-y-3">
              <div className="text-[14px] font-bold text-somaro-khaki-dark uppercase tracking-wider">
                Visi Korporat
              </div>
              <p className="text-[16px] text-somaro-brown font-medium leading-[1.65]">
                &ldquo;Menjadi perusahaan holding kesehatan dan medis terdepan, terpercaya, dan berkelanjutan 
                yang mengintegrasikan layanan hospital, maklon dan distribusi farmasi, produk kecantikan estetika, 
                serta teknologi alat kesehatan berstandar regulasi tertinggi di tingkat nasional maupun internasional.&rdquo;
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-[22px] font-bold leading-[1.3] text-somaro-brown">Misi Strategis:</h3>
              <ul className="space-y-4 text-[16px] text-stone-600 leading-[1.65]">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-somaro-brown shrink-0 mt-1" />
                  <span>
                    <strong>Layanan Hospital & Klinik Unggulan (Shòu/Sō):</strong> Memprioritaskan keberlanjutan hidup, penanganan medis terakreditasi, dan keselamatan pasien secara paripurna.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-somaro-brown shrink-0 mt-1" />
                  <span>
                    <strong>Inovasi Maklon & Distribusi Farmasi (Mǎn/Ma):</strong> Menghadirkan kesempurnaan formula skincare, kosmetik, dan sediaan farmasi dengan kepatuhan regulasi BPOM.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-somaro-brown shrink-0 mt-1" />
                  <span>
                    <strong>Pengadaan Alat Kesehatan Mutakhir (Lù/Rō):</strong> Menjalin kemitraan global untuk menghadirkan mesin diagnostik dan peralatan rumah sakit modern berlisensi resmi Kemenkes.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-somaro-brown shrink-0 mt-1" />
                  <span>
                    <strong>Pertumbuhan Berkelanjutan:</strong> Menjaga tata kelola korporat yang transparan, beretika, dan bertumbuh secara sehat.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-apple-hover h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
              alt="Somaro Medical Center"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-somaro-brown/80 via-transparent to-transparent flex items-end p-8 text-white">
              <div>
                <span className="text-[14px] uppercase tracking-widest text-somaro-khaki font-semibold">
                  Komitmen Mutu
                </span>
                <h4 className="text-[22px] font-bold leading-[1.3] mt-1">Standar KARS Paripurna & CPOB/CPKB</h4>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
