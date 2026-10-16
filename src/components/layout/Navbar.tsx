'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ChevronDown, 
  HeartPulse,
  FlaskConical,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setBusinessDropdownOpen(false);
  }, [pathname]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const businessPillars = [
    {
      title: 'Somaro Hospital & Klinik Utama',
      href: '/unit-bisnis/hospital',
      desc: 'Fasilitas rawat inap, kamar bedah modular & ICU KARS Paripurna.',
      icon: HeartPulse,
    },
    {
      title: 'Maklon Farmasi, Skincare & Estetika',
      href: '/unit-bisnis/maklon-farmasi',
      desc: 'OEM/ODM formulasi kecantikan medis berizin edar CPOB/CPKB BPOM.',
      icon: FlaskConical,
    },
    {
      title: 'Pengadaan Alat Kesehatan & Mesin',
      href: '/unit-bisnis/alat-kesehatan',
      desc: 'Distribusi resmi teknologi pencitraan diagnostik & mesin farmasi.',
      icon: Activity,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3.5 sm:py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={cn(
            'flex items-center justify-between px-6 sm:px-8 py-3 rounded-full transition-all duration-300',
            isScrolled
              ? 'glass-apple shadow-apple border border-white/60'
              : 'bg-white/90 backdrop-blur-md border border-somaro-khaki-light/40 shadow-sm'
          )}
        >
          {/* Enlarged Logo (/logo.svg) */}
          <NextLink href="/" className="flex items-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="PT Somaro Medika Utama"
              className="h-14 sm:h-16 md:h-[68px] w-auto object-contain"
            />
          </NextLink>

          {/* Navigation Links (Larger Font & Medium Weight) */}
          <nav className="hidden md:flex items-center gap-2">
            <NextLink
              href="/"
              className={cn(
                'px-5 py-2.5 rounded-full text-[16px] lg:text-[17px] font-medium transition-all duration-200 whitespace-nowrap',
                pathname === '/'
                  ? 'text-somaro-brown bg-somaro-khaki-soft/90 shadow-sm'
                  : 'text-stone-700 hover:text-somaro-brown hover:bg-somaro-khaki-soft/50'
              )}
            >
              Beranda
            </NextLink>

            <NextLink
              href="/tentang-kami"
              className={cn(
                'px-5 py-2.5 rounded-full text-[16px] lg:text-[17px] font-medium transition-all duration-200 whitespace-nowrap',
                pathname === '/tentang-kami'
                  ? 'text-somaro-brown bg-somaro-khaki-soft/90 shadow-sm'
                  : 'text-stone-700 hover:text-somaro-brown hover:bg-somaro-khaki-soft/50'
              )}
            >
              Tentang Kami
            </NextLink>

            {/* Dropdown Menu */}
            <div className="relative" onMouseLeave={() => setBusinessDropdownOpen(false)}>
              <button
                type="button"
                onClick={() => setBusinessDropdownOpen(!businessDropdownOpen)}
                onMouseEnter={() => setBusinessDropdownOpen(true)}
                className={cn(
                  'flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[16px] lg:text-[17px] font-medium transition-all duration-200 whitespace-nowrap',
                  pathname.startsWith('/unit-bisnis')
                    ? 'text-somaro-brown bg-somaro-khaki-soft/90 shadow-sm'
                    : 'text-stone-700 hover:text-somaro-brown hover:bg-somaro-khaki-soft/50'
                )}
              >
                <span>Unit Bisnis</span>
                <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', businessDropdownOpen && 'rotate-180')} />
              </button>

              {businessDropdownOpen && (
                <div 
                  className="absolute right-0 md:left-0 mt-2 w-96 rounded-3xl glass-apple-card shadow-apple-hover p-3.5 transition-all duration-200 border border-somaro-khaki-light/60 animate-in fade-in zoom-in-95"
                  onMouseEnter={() => setBusinessDropdownOpen(true)}
                >
                  <div className="px-3 py-1.5 text-[14px] font-bold uppercase tracking-wider text-somaro-khaki-dark">
                    3 Pilar Utama Holding
                  </div>
                  {businessPillars.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NextLink
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-somaro-khaki-soft/80 transition-colors group"
                      >
                        <div className="p-2.5 rounded-xl bg-somaro-khaki-soft text-somaro-brown group-hover:bg-somaro-brown group-hover:text-somaro-khaki transition-colors shrink-0 mt-0.5">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[16px] font-bold text-somaro-brown group-hover:text-somaro-brown-deep">
                            {item.title}
                          </div>
                          <div className="text-[14px] text-stone-600 line-clamp-1 mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                      </NextLink>
                    );
                  })}
                </div>
              )}
            </div>

            <NextLink
              href="/berita"
              className={cn(
                'px-5 py-2.5 rounded-full text-[16px] lg:text-[17px] font-medium transition-all duration-200 whitespace-nowrap',
                pathname.startsWith('/berita')
                  ? 'text-somaro-brown bg-somaro-khaki-soft/90 shadow-sm'
                  : 'text-stone-700 hover:text-somaro-brown hover:bg-somaro-khaki-soft/50'
              )}
            >
              Berita & Regulasi
            </NextLink>
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full text-somaro-brown hover:bg-somaro-khaki-soft transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Buka Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl glass-apple-card rounded-3xl p-5 border border-somaro-khaki-light/60 shadow-apple-hover animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            <NextLink
              href="/"
              className="px-4 py-3 rounded-2xl text-[16px] font-medium text-somaro-brown hover:bg-somaro-khaki-soft"
            >
              Beranda
            </NextLink>
            <NextLink
              href="/tentang-kami"
              className="px-4 py-3 rounded-2xl text-[16px] font-medium text-somaro-brown hover:bg-somaro-khaki-soft"
            >
              Tentang Kami
            </NextLink>

            <div className="py-2 border-y border-somaro-khaki-light/30 my-1">
              <div className="px-4 text-[14px] font-bold uppercase tracking-wider text-somaro-khaki-dark mb-1">
                Pilar Unit Bisnis
              </div>
              {businessPillars.map((item) => (
                <NextLink
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2.5 rounded-2xl text-[15px] font-medium text-stone-700 hover:text-somaro-brown hover:bg-somaro-khaki-soft/70 block"
                >
                  {item.title}
                </NextLink>
              ))}
            </div>

            <NextLink
              href="/berita"
              className="px-4 py-3 rounded-2xl text-[16px] font-medium text-somaro-brown hover:bg-somaro-khaki-soft"
            >
              Berita & Regulasi
            </NextLink>
          </div>
        </div>
      )}
    </header>
  );
}
