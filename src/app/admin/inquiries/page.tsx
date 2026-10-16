'use client';

import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Building2,
  MessageSquare,
  AlertCircle,
  X,
  FileCheck,
} from 'lucide-react';
import { PartnerInquiry, InquiryStatus } from '@/types';
import { formatTimeAgo, formatDate } from '@/lib/utils';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<PartnerInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<PartnerInquiry | null>(null);
  const [updating, setUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.data) {
        setInquiries(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleOpenDetail = (inquiry: PartnerInquiry) => {
    setSelectedInquiry(inquiry);
    setAdminNotes(inquiry.admin_notes || '');
  };

  const handleUpdateStatus = async (newStatus: InquiryStatus) => {
    if (!selectedInquiry) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/inquiries/${selectedInquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          admin_notes: adminNotes,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedInquiry(data.data);
        setInquiries((prev) =>
          prev.map((item) => (item.id === data.data.id ? data.data : item))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const filtered = inquiries.filter((item) => {
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    const matchesQuery =
      item.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service_interest.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const statusStyles: Record<string, string> = {
    unread: 'bg-amber-100 text-amber-800 border-amber-300',
    contacted: 'bg-blue-100 text-blue-800 border-blue-300',
    resolved: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  };

  const statusLabels: Record<string, string> = {
    unread: 'Belum Ditindaklanjuti',
    contacted: 'Sudah Dihubungi',
    resolved: 'Selesai / Deal Kemitraan',
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-somaro-brown">
            Manajemen Pesan & Kemitraan (Inquiries)
          </h1>
          <p className="text-xs text-stone-500">
            Daftar prospek dan permohonan kemitraan dari klien publik website PT Somaro Medika Utama.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-3xl bg-white border border-somaro-khaki-light/60 shadow-apple flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {['all', 'unread', 'contacted', 'resolved'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterStatus === st
                  ? 'bg-somaro-brown text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st === 'all' ? 'Semua Status' : statusLabels[st]}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama, PT, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-somaro-surface-subtle border border-somaro-khaki-light focus:outline-none focus:ring-2 focus:ring-somaro-brown"
          />
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="rounded-3xl bg-white border border-somaro-khaki-light/60 shadow-apple overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50/80 border-b border-somaro-khaki-light/40 text-stone-400 uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-6 font-semibold">Nama & Institusi</th>
                <th className="py-3.5 px-4 font-semibold">Kontak</th>
                <th className="py-3.5 px-4 font-semibold">Pilar Peminatan</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Waktu Masuk</th>
                <th className="py-3.5 px-6 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-stone-50/60 transition-colors cursor-pointer"
                  onClick={() => handleOpenDetail(item)}
                >
                  <td className="py-4 px-6">
                    <div className="font-bold text-somaro-brown">{item.full_name}</div>
                    <div className="text-[11px] text-stone-500">{item.company_name}</div>
                  </td>
                  <td className="py-4 px-4 text-stone-600">
                    <div>{item.email}</div>
                    <div className="text-[11px] text-stone-400">{item.phone}</div>
                  </td>
                  <td className="py-4 px-4 font-medium text-stone-700">
                    {item.service_interest}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                        statusStyles[item.status]
                      }`}
                    >
                      {statusLabels[item.status]}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-stone-500">
                    {formatTimeAgo(item.created_at)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetail(item);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-somaro-khaki-soft text-somaro-brown hover:bg-somaro-brown hover:text-white transition-colors text-[11px] font-semibold"
                    >
                      Buka Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-stone-500 text-xs">
            Tidak ada permohonan kemitraan yang cocok dengan kriteria pencarian.
          </div>
        )}
      </div>

      {/* Detail & Action Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-somaro-khaki-light space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-somaro-khaki-dark">
                  Detail Prospek Kemitraan
                </span>
                <h3 className="text-xl font-bold text-somaro-brown mt-0.5">
                  {selectedInquiry.full_name}
                </h3>
                <div className="text-xs text-stone-500">{selectedInquiry.company_name}</div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="p-1 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light/40 space-y-1">
                <span className="text-stone-400 uppercase text-[10px] font-semibold">Email Klien</span>
                <div className="font-semibold text-somaro-brown flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-somaro-khaki-dark" />
                  <a href={`mailto:${selectedInquiry.email}`} className="hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light/40 space-y-1">
                <span className="text-stone-400 uppercase text-[10px] font-semibold">Nomor Telepon</span>
                <div className="font-semibold text-somaro-brown flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-somaro-khaki-dark" />
                  <a href={`tel:${selectedInquiry.phone}`} className="hover:underline">
                    {selectedInquiry.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-somaro-brown uppercase tracking-wider">
                Rincian Pesan / Kebutuhan Kemitraan:
              </label>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Admin Internal Notes */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-somaro-brown uppercase tracking-wider">
                Catatan Internal Tim Holding:
              </label>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Tuliskan catatan tindak lanjut, kesepakatan meeting, atau PIC holding yang menangani..."
                className="w-full p-3.5 rounded-2xl text-xs bg-somaro-surface-subtle border border-somaro-khaki-light focus:outline-none focus:ring-2 focus:ring-somaro-brown"
              />
            </div>

            {/* Status Change Buttons */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <span className="text-xs font-bold text-somaro-brown block">
                Perbarui Status Penanganan:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => handleUpdateStatus('unread')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                    selectedInquiry.status === 'unread'
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  Belum Ditindaklanjuti
                </button>

                <button
                  type="button"
                  disabled={updating}
                  onClick={() => handleUpdateStatus('contacted')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                    selectedInquiry.status === 'contacted'
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  Sudah Dihubungi (Follow-up)
                </button>

                <button
                  type="button"
                  disabled={updating}
                  onClick={() => handleUpdateStatus('resolved')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border ${
                    selectedInquiry.status === 'resolved'
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  Selesai (Deal / Selesai)
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2.5 rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs font-semibold"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
