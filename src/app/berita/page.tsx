'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { initialArticles } from '@/lib/mock-data';

const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function BeritaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['Semua', 'Regulasi & Kepatuhan', 'Inovasi Klinis', 'Teknologi Medis'];

  const filteredArticles = initialArticles.filter((art) => {
    const matchesCategory =
      selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20">
      {/* Header Banner */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionReveal}
        className="bg-gradient-to-b from-white via-somaro-surface-subtle to-somaro-khaki-soft/30 py-16 border-b border-somaro-khaki-light/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-somaro-khaki-soft border border-somaro-khaki-light text-[14px] font-semibold text-somaro-brown uppercase tracking-wider">
            Publikasi Resmi & Regulasi
          </div>
          <h1 className="text-[36px] sm:text-[42px] font-bold text-somaro-brown leading-[1.3] tracking-tight">
            Wawasan Medis, Berita & Kepatuhan Standar
          </h1>
          <p className="text-[16px] text-stone-600 max-w-2xl mx-auto leading-[1.65]">
            Informasi terkini mengenai inovasi layanan klinis, pembaruan pedoman audit CPOB/CPKB BPOM,
            dan kepatuhan regulasi Kementerian Kesehatan Republik Indonesia.
          </p>
        </div>
      </motion.section>

      {/* Filter and Search Bar */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionReveal}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-somaro-khaki-light/50">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-[14px] font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-somaro-brown text-white shadow-sm'
                    : 'bg-white text-stone-600 border border-somaro-khaki-light hover:bg-stone-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari artikel atau regulasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-[16px] rounded-full bg-white border border-somaro-khaki-light focus:outline-none focus:ring-2 focus:ring-somaro-brown text-somaro-brown shadow-sm"
            />
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {filteredArticles.map((article) => (
            <NextLink
              key={article.id}
              href={`/berita/${article.slug}`}
              className="w-full max-w-[380px] group rounded-3xl overflow-hidden glass-card shadow-apple hover:shadow-apple-hover transition-all duration-300 flex flex-col border border-somaro-khaki-light/60"
            >
              <div className="h-56 relative overflow-hidden bg-stone-100">
                <Image
                  src={article.thumbnail_url}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[14px] font-semibold text-somaro-brown shadow-sm">
                  {article.category}
                </div>
              </div>

              <div className="p-7 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="text-[22px] font-bold leading-[1.3] text-somaro-brown group-hover:text-somaro-brown-medium transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-[16px] text-stone-600 line-clamp-3 leading-[1.65]">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-somaro-khaki-light/40 flex items-center justify-between text-[14px] text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-somaro-khaki-dark" />
                    <span>{article.author_name}</span>
                  </div>
                  <span className="font-semibold text-somaro-brown flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Baca <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </NextLink>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 text-stone-500 text-[16px]">
            Tidak ada artikel yang cocok dengan pencarian Anda.
          </div>
        )}
      </motion.section>
    </div>
  );
}
