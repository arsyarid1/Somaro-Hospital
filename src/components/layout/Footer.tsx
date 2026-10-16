'use client';

import React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Mail, 
  Phone, 
  MapPin, 
  HeartPulse,
  FlaskConical,
  Activity,
} from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-somaro-brown text-white/90 pt-16 pb-12 border-t border-somaro-brown-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <NextLink href="/" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-white.svg"
                alt="PT Somaro Medika Utama"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </NextLink>

            <p className="text-[16px] text-stone-200 leading-relaxed max-w-md pt-2">
              Perusahaan holding kesehatan dan medis terdepan yang mengintegrasikan layanan rumah sakit, 
              maklon & distribusi farmasi estetika, serta pengadaan alat kesehatan modern berstandar regulasi tertinggi.
            </p>
          </div>

          {/* Unit Bisnis Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-somaro-khaki uppercase tracking-widest">
              Pilar Unit Bisnis
            </h4>
            <ul className="space-y-3 text-[16px] text-stone-200">
              <li>
                <NextLink
                  href="/unit-bisnis/hospital"
                  className="hover:text-somaro-khaki transition-colors flex items-center gap-2.5"
                >
                  <HeartPulse className="w-4 h-4 text-somaro-khaki/80 shrink-0" />
                  <span>Hospital & Klinik Utama</span>
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/unit-bisnis/maklon-farmasi"
                  className="hover:text-somaro-khaki transition-colors flex items-center gap-2.5"
                >
                  <FlaskConical className="w-4 h-4 text-somaro-khaki/80 shrink-0" />
                  <span>Maklon Farmasi & Skincare</span>
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/unit-bisnis/alat-kesehatan"
                  className="hover:text-somaro-khaki transition-colors flex items-center gap-2.5"
                >
                  <Activity className="w-4 h-4 text-somaro-khaki/80 shrink-0" />
                  <span>Pengadaan Alat Kesehatan</span>
                </NextLink>
              </li>
            </ul>
          </div>

          {/* Korporasi Links */}
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-somaro-khaki uppercase tracking-widest">
              Informasi Korporat
            </h4>
            <ul className="space-y-3 text-[16px] text-stone-200">
              <li>
                <NextLink href="/tentang-kami" className="hover:text-somaro-khaki transition-colors">
                  Profil & Visi Misi
                </NextLink>
              </li>
              <li>
                <NextLink href="/berita" className="hover:text-somaro-khaki transition-colors">
                  Berita & Regulasi Medis
                </NextLink>
              </li>
            </ul>
          </div>

          {/* Kantor Pusat & Kontak */}
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-somaro-khaki uppercase tracking-widest">
              Kantor Pusat Holding
            </h4>
            <ul className="space-y-3.5 text-[16px] text-stone-200">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-somaro-khaki shrink-0 mt-1" />
                <span>
                  Somaro Tower, Medical District Penthouse Suite, Jakarta Selatan, DKI Jakarta 12950
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-somaro-khaki shrink-0" />
                <span>+62 (21) 8089-SOMARO (7662)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-somaro-khaki shrink-0" />
                <span>info@somaro.co.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-400">
          <div>
            &copy; {new Date().getFullYear()} PT Somaro Medika Utama. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-6">
            <NextLink href="/berita" className="hover:text-stone-200">
              Kebijakan Privasi
            </NextLink>
            <NextLink href="/berita" className="hover:text-stone-200">
              Standar Good Clinical Practice
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
