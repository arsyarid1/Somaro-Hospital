'use client';

import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, ShieldCheck, Share2, Tag } from 'lucide-react';
import { initialArticles } from '@/lib/mock-data';

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = initialArticles.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-somaro-brown">Artikel Tidak Ditemukan</h1>
        <p className="text-stone-600 text-sm">Publikasi yang Anda cari tidak tersedia atau telah dipindahkan.</p>
        <NextLink
          href="/berita"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-somaro-brown text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Indeks Berita
        </NextLink>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="py-6">
          <NextLink
            href="/berita"
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-somaro-brown transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Seluruh Publikasi
          </NextLink>
        </div>

        {/* Header Content */}
        <div className="space-y-4 pb-8 border-b border-somaro-khaki-light/50">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-somaro-khaki-soft text-xs font-semibold text-somaro-brown">
            <Tag className="w-3 h-3 text-somaro-khaki-dark" />
            <span>{article.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-somaro-brown tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-stone-500">
            <div className="flex items-center gap-4">
              <span>Penulis: <strong className="text-stone-700">{article.author_name}</strong></span>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-somaro-khaki-dark" />
                <span>Publikasi Resmi Somaro Holding</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck className="w-4 h-4" /> Regulasi Terverifikasi
              </span>
            </div>
          </div>
        </div>

        {/* Thumbnail Image */}
        <div className="my-8 rounded-3xl overflow-hidden shadow-apple-card relative h-80 sm:h-[450px]">
          <Image
            src={article.thumbnail_url}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed text-lg space-y-6">
          <p className="text-xl font-medium text-somaro-brown leading-relaxed bg-somaro-khaki-soft/50 p-6 rounded-2xl border-l-4 border-somaro-brown">
            {article.excerpt}
          </p>

          <div className="space-y-4 whitespace-pre-line text-base sm:text-lg leading-relaxed">
            {article.content}
          </div>
        </div>
      </article>
    </div>
  );
}
