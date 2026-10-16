'use client';

import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import {
  Inbox,
  Briefcase,
  FileText,
  Sliders,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { PartnerInquiry, BusinessService, Article } from '@/types';
import { formatTimeAgo } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [inquiries, setInquiries] = useState<PartnerInquiry[]>([]);
  const [services, setServices] = useState<BusinessService[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [inqRes, srvRes, artRes] = await Promise.all([
          fetch('/api/inquiries').then((r) => r.json()),
          fetch('/api/services').then((r) => r.json()),
          fetch('/api/articles').then((r) => r.json()),
        ]);

        if (inqRes.data) setInquiries(inqRes.data);
        if (srvRes.data) setServices(srvRes.data);
        if (artRes.data) setArticles(artRes.data);
      } catch (err) {
        console.error('Failed to load dashboard statistics', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const unreadCount = inquiries.filter((i) => i.status === 'unread').length;
  const publishedArticlesCount = articles.filter((a) => a.is_published).length;

  const statCards = [
    {
      title: 'Pesan Masuk (Inquiries)',
      value: inquiries.length,
      sub: `${unreadCount} belum ditindaklanjuti`,
      icon: Inbox,
      href: '/admin/inquiries',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      title: 'Unit Bisnis & Produk',
      value: services.length,
      sub: '3 pilar holding aktif',
      icon: Briefcase,
      href: '/admin/services',
      color: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      title: 'Artikel & Regulasi Terbit',
      value: publishedArticlesCount,
      sub: 'Kepatuhan Kemenkes & BPOM',
      icon: FileText,
      href: '/admin/articles',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      title: 'CMS & Konten Halaman',
      value: 'Aktif',
      sub: 'Hero, Visi-Misi, Tagline',
      icon: Sliders,
      href: '/admin/cms',
      color: 'bg-stone-50 text-stone-800 border-stone-200',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-white border border-somaro-khaki-light/60 shadow-apple flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-somaro-khaki-dark">
            <ShieldCheck className="w-4 h-4 text-somaro-brown" /> Ekosistem Holding Terintegrasi
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-somaro-brown tracking-tight">
            Selamat Datang di Portal Manajemen Somaro
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Pantau permohonan kemitraan, perbarui katalog produk unit bisnis, dan kelola publikasi regulasi medis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <NextLink
            href="/admin/inquiries"
            className="px-5 py-2.5 rounded-full bg-somaro-brown text-white text-xs font-semibold hover:bg-somaro-brown-hover transition-colors shadow-sm"
          >
            Tinjau Pesan Baru ({unreadCount})
          </NextLink>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <NextLink
              key={idx}
              href={card.href}
              className="p-6 rounded-3xl bg-white border border-somaro-khaki-light/60 shadow-apple hover:shadow-apple-hover transition-all duration-200 group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500">{card.title}</span>
                <div className={`p-2.5 rounded-2xl ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-somaro-brown tracking-tight">
                  {loading ? '...' : card.value}
                </div>
                <div className="text-xs text-stone-500 mt-1">{card.sub}</div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-semibold text-somaro-brown group-hover:text-somaro-brown-medium">
                <span>Kelola Data</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </NextLink>
          );
        })}
      </div>

      {/* Recent Inquiries Section */}
      <div className="p-8 rounded-3xl bg-white border border-somaro-khaki-light/60 shadow-apple space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-somaro-brown">Pesan Kemitraan Terbaru</h2>
            <p className="text-xs text-stone-500">
              Formulir masuk dari rumah sakit rekanan, klinik spesialis, dan brand maklon.
            </p>
          </div>
          <NextLink
            href="/admin/inquiries"
            className="text-xs font-semibold text-somaro-brown hover:underline flex items-center gap-1"
          >
            Lihat Semua Pesan <ArrowUpRight className="w-3.5 h-3.5" />
          </NextLink>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-somaro-khaki-light/40 text-stone-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-semibold">Nama Pemohon & Perusahaan</th>
                <th className="py-3 px-4 font-semibold">Unit Bisnis Diminati</th>
                <th className="py-3 px-4 font-semibold">Waktu Pengiriman</th>
                <th className="py-3 px-4 font-semibold">Status Penanganan</th>
                <th className="py-3 px-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {inquiries.slice(0, 5).map((inq) => {
                const statusStyles: Record<string, string> = {
                  unread: 'bg-amber-100 text-amber-800 border-amber-300',
                  contacted: 'bg-blue-100 text-blue-800 border-blue-300',
                  resolved: 'bg-emerald-100 text-emerald-800 border-emerald-300',
                };
                const statusLabels: Record<string, string> = {
                  unread: 'Belum Dibaca',
                  contacted: 'Sudah Dihubungi',
                  resolved: 'Selesai / Deal',
                };

                return (
                  <tr key={inq.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-somaro-brown">{inq.full_name}</div>
                      <div className="text-[11px] text-stone-500">{inq.company_name}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-stone-700">
                      {inq.service_interest}
                    </td>
                    <td className="py-4 px-4 text-stone-500">
                      {formatTimeAgo(inq.created_at)}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          statusStyles[inq.status] || 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {statusLabels[inq.status] || inq.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <NextLink
                        href="/admin/inquiries"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-somaro-brown hover:text-white transition-colors text-[11px] font-semibold text-stone-700"
                      >
                        <Eye className="w-3.5 h-3.5" /> Buka
                      </NextLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
