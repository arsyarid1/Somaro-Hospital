'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Activity,
  ShieldCheck,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AlatKesehatanPage() {
  const catalog = [
    {
      category: 'Teknologi Pencitraan & Diagnostik',
      items: [
        'CT-Scan 128 Slices Low-Radiation Dose',
        'MRI 1.5 Tesla Superconducting Magnet',
        'Ultrasonografi 4D Color Doppler Multi-Probe',
        'Digital Radiography (DR) X-Ray System',
      ],
      desc: 'Perangkat diagnostik radiologi resolusi tinggi dengan software rekonstruksi gambar berbasis kecerdasan buatan untuk akurasi medis maksimal.',
    },
    {
      category: 'Peralatan Bedah & Ruang Operasi',
      items: [
        'Mesin Anestesi Digital dengan Multi-Gas Analyzer',
        'Laparoskopi 4K Ultra High Definition System',
        'Lampu Operasi LED Shadowless Terintegrasi Kamera',
        'Meja Operasi Elektrik Multi-Positioning',
      ],
      desc: 'Peralatan ruang bedah modular berstandar internasional yang menunjang prosedur invasif minimal dengan tingkat keamanan tinggi.',
    },
    {
      category: 'Mesin Manufaktur & Laboratorium Farmasi',
      items: [
        'High-Shear Vacuum Homogenizer Emulsifier',
        'Automatic Liquid Filling & Capping Machine',
        'Sterilisasi Autoklaf Bertekanan Kapasitas Besar',
        'Peralatan Uji Disolusi & Stabilitas Mikrobiologi',
      ],
      desc: 'Mesin pengolahan sediaan cair, krim, dan gel yang dirancang khusus untuk memenuhi audit CPOB dan CPKB BPOM.',
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
                <Activity className="w-4 h-4" /> Pilar 3 • Lù (Rō)
              </div>
              <h1 className="text-[36px] sm:text-[42px] font-bold text-somaro-brown leading-[1.3] tracking-tight">
                Pengadaan Alat Kesehatan & Mesin Medis
              </h1>
              <p className="text-[16px] text-stone-600 leading-[1.65] font-normal">
                Penyedia dan distributor resmi teknologi diagnostik, instrumen bedah ruang operasi,
                serta mesin manufaktur farmasi berizin edar Kemenkes RI (AKL/AKD) dengan jaminan sertifikasi CDAKB dan kalibrasi berkala.
              </p>
            </div>

            <div className="lg:col-span-5 relative h-72 lg:h-96 rounded-3xl overflow-hidden shadow-apple-hover">
              <Image
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
                alt="Alat Kesehatan Somaro"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Katalog Kategori Alkes */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionReveal}
        className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[14px] font-semibold uppercase tracking-widest text-somaro-khaki-dark">
            Spesifikasi Alat
          </span>
          <h2 className="text-[36px] font-bold leading-[1.3] text-somaro-brown tracking-tight">
            Katalog Peralatan Medis & Manufaktur
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {catalog.map((cat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-somaro-khaki-light/60 shadow-apple flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-somaro-khaki-soft text-somaro-brown flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-[22px] font-bold leading-[1.3] text-somaro-brown">{cat.category}</h3>
                <p className="text-[16px] text-stone-600 leading-[1.65]">{cat.desc}</p>

                <div className="pt-3 border-t border-somaro-khaki-light/40 space-y-2.5">
                  <div className="text-[14px] font-semibold text-somaro-khaki-dark uppercase">
                    Instrumen Unggulan:
                  </div>
                  <ul className="space-y-2.5 text-[16px] text-stone-600">
                    {cat.items.map((it, iidx) => (
                      <li key={iidx} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-somaro-brown shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-somaro-khaki-light/40 flex items-center justify-between text-[14px] text-stone-500">
                <span className="font-semibold text-somaro-brown">Izin Edar AKL/AKD Kemenkes</span>
                <ShieldCheck className="w-4 h-4 text-somaro-brown" />
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Layanan Purna Jual & Kalibrasi */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionReveal}
        className="py-20 bg-somaro-surface-subtle border-y border-somaro-khaki-light/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-[14px] font-semibold uppercase tracking-widest text-somaro-khaki-dark">
                Purna Jual Terpercaya
              </span>
              <h2 className="text-[36px] font-bold leading-[1.3] text-somaro-brown tracking-tight">
                Layanan Kalibrasi & Dukungan Teknisi Biomedis 24/7
              </h2>
              <p className="text-[16px] text-stone-600 leading-[1.65]">
                Kami memahami bahwa keandalan alat kesehatan adalah penentu keselamatan pasien. 
                Oleh karena itu, setiap pembelian dilengkapi dengan garansi resmi, ketersediaan suku cadang asli, 
                serta sertifikasi kalibrasi tahunan yang diakui oleh Kementerian Kesehatan RI.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-white border border-somaro-khaki-light/60">
                  <div className="text-[16px] font-bold text-somaro-brown">Respon Darurat &lt;4 Jam</div>
                  <div className="text-[14px] text-stone-500 mt-1">Dukungan on-site teknisi tersertifikasi</div>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-somaro-khaki-light/60">
                  <div className="text-[16px] font-bold text-somaro-brown">Sertifikasi CDAKB</div>
                  <div className="text-[14px] text-stone-500 mt-1">Cara Distribusi Alat Kesehatan yang Baik</div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-somaro-brown text-white space-y-4 shadow-apple-hover">
              <h3 className="text-[22px] font-bold leading-[1.3]">Standar Distribusi & Kalibrasi Rumah Sakit</h3>
              <p className="text-[16px] text-stone-200 leading-[1.65]">
                Tim ahli elektromedis kami mendampingi perencanaan kebutuhan alkes, 
                studi kelayakan ruang radiologi, dan penyusunan spesifikasi teknis untuk fasilitas kesehatan di seluruh Indonesia.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
