'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FlaskConical,
  CheckCircle2,
  Package,
} from 'lucide-react';

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function MaklonFarmasiPage() {
  const steps = [
    {
      num: '01',
      title: 'Konsultasi Konsep & Formulasi',
      desc: 'Diskusi mendalam bersama apoteker formulator kami untuk merumuskan bahan aktif unggulan, target efikasi klinis, dan tren pasar.',
    },
    {
      num: '02',
      title: 'Sampling Laboratorium & Uji Efikasi',
      desc: 'Pembuatan prototipe sampel di laboratorium R&D kami hingga mencapai tekstur, stabilitas fisik, dan aroma yang sempurna sesuai keinginan Anda.',
    },
    {
      num: '03',
      title: 'Registrasi Legalitas BPOM & Sertifikasi Halal',
      desc: 'Tim regulasi internal kami mengurus pengajuan notifikasi izin edar BPOM dan sertifikat Halal secara resmi dan transparan.',
    },
    {
      num: '04',
      title: 'Desain Kemasan Mewah (Apple-aesthetic)',
      desc: 'Bantuan desain identitas visual botol, kotak, dan kemasan primer-sekunder dengan material ramah lingkungan dan elegan.',
    },
    {
      num: '05',
      title: 'Produksi Massal di Cleanroom CPOB/CPKB',
      desc: 'Manufaktur skala besar di ruangan bertekanan positif dengan mesin otomasi pengisian dan penyegelan presisi tinggi.',
    },
    {
      num: '06',
      title: 'Quality Control & Siap Distribusi',
      desc: 'Pemeriksaan laboratorium mikrobiologi batch akhir sebelum produk dikirimkan dengan aman ke gudang Anda untuk dipasarkan.',
    },
  ];

  const productCategories = [
    {
      title: 'Dermokosmetik & Skincare Medis',
      items: ['Serum Pencerah & Anti-Aging', 'Tabir Surya (Sunscreen Hybrid)', 'Barrier Repair Moisturizer', 'Pembersih Wajah pH Seimbang'],
    },
    {
      title: 'Sediaan Farmasi & Obat Bebas (OTC)',
      items: ['Salep Antiseptik & Pereda Nyeri', 'Cairan Antiseptik Medis', 'Sirup Suplemen Kesehatan', 'Gel Terapi Luka Bakar'],
    },
    {
      title: 'Produk Perawatan Tubuh & Rambut',
      items: ['Body Lotion Niacinamide', 'Shampoo Anti-Dandruff Klinis', 'Hair Growth Tonic', 'Eksfoliator Mandi Medis'],
    },
  ];

  return (
    <div className="pt-28 pb-20">
      {/* Hero Header */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
        className="bg-gradient-to-b from-white via-somaro-surface-subtle to-somaro-khaki-soft/30 py-16 border-b border-somaro-khaki-light/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-somaro-khaki-soft border border-somaro-khaki-light text-[14px] font-semibold text-somaro-brown uppercase tracking-wider">
                <FlaskConical className="w-4 h-4" /> Pilar 2 • Mǎn (Ma)
              </div>
              <h1 className="text-[36px] sm:text-[42px] font-bold text-somaro-brown leading-[1.3] tracking-tight">
                Maklon Farmasi, Skincare & Kosmetika Estetika
              </h1>
              <p className="text-[16px] text-stone-600 leading-[1.65] font-normal">
                Penyedia manufaktur kontrak satu pintu (One-Stop OEM/ODM) berstandar CPOB dan CPKB BPOM.
                Membantu klinik estetika, dokter spesialis kulit, dan pengusaha merek kecantikan mewujudkan produk berizin resmi dengan kualitas internasional.
              </p>
            </div>

            <div className="lg:col-span-5 relative h-72 lg:h-96 rounded-3xl overflow-hidden shadow-apple-hover">
              <Image
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80"
                alt="Maklon Farmasi Somaro"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* 6 Tahap Alur Maklon */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionReveal}
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[14px] font-semibold uppercase tracking-widest text-somaro-khaki-dark">
            Proses Terstruktur
          </span>
          <h2 className="text-[36px] font-bold leading-[1.3] text-somaro-brown tracking-tight">
            Alur Manufaktur Maklon (OEM / ODM)
          </h2>
          <p className="text-[22px] text-stone-600 leading-[1.4]">
            Dari formulasi ide hingga produk jadi siap edar di pasaran secara legal dan aman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-somaro-khaki-light/60 shadow-apple space-y-3 relative overflow-hidden"
            >
              <div className="text-[36px] font-bold leading-[1.3] font-serif text-somaro-khaki-dark">
                {st.num}
              </div>
              <h3 className="text-[22px] font-bold leading-[1.3] text-somaro-brown">{st.title}</h3>
              <p className="text-[16px] text-stone-600 leading-[1.65]">{st.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Kategori Sediaan Produk */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionReveal}
        className="py-20 bg-somaro-surface-subtle border-y border-somaro-khaki-light/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[14px] font-semibold uppercase tracking-widest text-somaro-khaki-dark">
              Spesialisasi Sediaan
            </span>
            <h2 className="text-[36px] font-bold leading-[1.3] text-somaro-brown tracking-tight">
              Portofolio Produk Siap Produksi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-somaro-khaki-light/60 shadow-apple space-y-4"
              >
                <div className="w-11 h-11 rounded-xl bg-somaro-khaki-soft text-somaro-brown flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="text-[22px] font-bold leading-[1.3] text-somaro-brown">{cat.title}</h3>
                <ul className="space-y-3 text-[16px] text-stone-600">
                  {cat.items.map((it, iidx) => (
                    <li key={iidx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-somaro-brown shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
