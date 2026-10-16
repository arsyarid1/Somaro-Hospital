'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  HeartPulse,
  CheckCircle2,
} from 'lucide-react';

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HospitalBusinessPage() {
  const facilities = [
    {
      title: 'Kamar Operasi Modular (OT Cleanroom)',
      desc: 'Sistem tata udara laminar airflow dengan tekanan positif dan HEPA filter teruji untuk meminimalkan risiko infeksi pasca operasi.',
    },
    {
      title: 'Instalasi Rawat Intensif (ICU & NICU)',
      desc: 'Dilengkapi pemantauan hemodinamik berkelanjutan, ventilator mekanik mutakhir, dan perawat bersertifikasi intensif care 24/7.',
    },
    {
      title: 'Ruang Rawat Inap VVIP & Eksekutif',
      desc: 'Dirancang dengan estetika minimalis menenangkan untuk menunjang proses pemulihan fisik dan kenyamanan keluarga pasien.',
    },
    {
      title: 'Unit Gawat Darurat (UGD) Cepat Tanggap 24 Jam',
      desc: 'Alur triase terkomputerisasi dengan tim dokter gawat darurat dan ambulans berstandar advance life support.',
    },
  ];

  const centersOfExcellence = [
    'Pusat Layanan Kardiovaskular & Kateterisasi Jantung (Cath Lab)',
    'Pusat Onkologi Terpadu & Kemoterapi Harian',
    'Bedah Minimal Invasif & Bedah Laparoskopi Presisi Tinggi',
    'Poliklinik Estetika Klinis & Dermatologi Lanjutan',
  ];

  return (
    <div className="pt-28 pb-20">
      {/* Hero Banner */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-b from-white via-somaro-surface-subtle to-somaro-khaki-soft/30 py-16 border-b border-somaro-khaki-light/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-somaro-khaki-soft border border-somaro-khaki-light text-[14px] font-semibold text-somaro-brown uppercase tracking-wider">
                <HeartPulse className="w-4 h-4" /> Pilar 1 • Shòu (Sō)
              </div>
              <h1 className="text-[36px] sm:text-5xl font-bold leading-[1.3] text-somaro-brown tracking-tight">
                Somaro Hospital & Jaringan Klinik Utama
              </h1>
              <p className="text-[22px] text-stone-600 leading-[1.45] font-normal">
                Pusat keunggulan medis komprehensif yang mengedepankan keselamatan pasien (patient safety),
                fasilitas bedah modular modern, serta sistem rekam medis elektronik yang terhubung langsung dengan platform SatuSehat Kemenkes RI.
              </p>
            </div>

            <div className="lg:col-span-5 relative h-72 lg:h-96 rounded-3xl overflow-hidden shadow-apple-hover">
              <Image
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
                alt="Somaro Hospital"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Keunggulan Fasilitas */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-[14px] font-semibold uppercase tracking-widest text-somaro-khaki-dark block">
            Fasilitas Standar Tinggi
          </span>
          <h2 className="text-[36px] font-bold leading-[1.3] text-somaro-brown tracking-tight">
            Infrastruktur Klinis & Teknologi Pasien
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-somaro-khaki-light/60 shadow-apple space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-somaro-khaki-soft text-somaro-brown flex items-center justify-center font-bold text-[14px]">
                0{idx + 1}
              </div>
              <h3 className="text-[22px] font-bold leading-[1.3] text-somaro-brown">{fac.title}</h3>
              <p className="text-[16px] text-stone-600 leading-[1.65]">{fac.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Centers of Excellence */}
      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="py-20 bg-somaro-surface-subtle border-y border-somaro-khaki-light/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-[14px] font-semibold uppercase tracking-widest text-somaro-khaki-dark block">
                Layanan Unggulan
              </span>
              <h2 className="text-[36px] font-bold leading-[1.3] text-somaro-brown tracking-tight">
                Pusat Keunggulan Spesialis Terpadu
              </h2>
              <p className="text-[16px] text-stone-600 leading-[1.65]">
                Setiap departemen klinis kami dikepalai oleh dokter spesialis dan konsultan senior
                yang didukung oleh protokol perawatan terkini berbasis bukti ilmiah (evidence-based medicine).
              </p>

              <div className="space-y-3">
                {centersOfExcellence.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-somaro-khaki-light/50">
                    <CheckCircle2 className="w-5 h-5 text-somaro-brown shrink-0" />
                    <span className="text-[16px] font-semibold text-somaro-brown">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-somaro-brown text-white space-y-6 shadow-apple-hover">
              <span className="text-[14px] font-semibold uppercase tracking-wider text-somaro-khaki block">
                Standar Akreditasi & Kepatuhan
              </span>
              <h3 className="text-[22px] font-bold leading-[1.3] tracking-tight">
                Akreditasi Paripurna KARS & Kemenkes RI
              </h3>
              <p className="text-[16px] text-stone-200 leading-[1.65]">
                Seluruh fasilitas rumah sakit di bawah holding Somaro Medika Utama telah memenuhi kelayakan paripurna
                untuk indikator mutu nasional (INM), pencegahan dan pengendalian infeksi (PPI), serta keselamatan pasien.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[14px] text-somaro-khaki">
                <span>Terintegrasi SatuSehat Kemenkes</span>
                <span>Standar Pelayanan JCI Ready</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
