'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Eye,
  Layers,
} from 'lucide-react';
import { BusinessService, ServiceCategory } from '@/types';

export default function AdminServicesPage() {
  const [services, setServices] = useState<BusinessService[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<BusinessService | null>(null);

  // Form states
  const [category, setCategory] = useState<ServiceCategory>('hospital');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [standards, setStandards] = useState('Kemenkes RI, KARS Paripurna');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.data) {
        setServices(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setCategory('hospital');
    setTitle('');
    setSlug('');
    setSummary('');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80');
    setStandards('Kemenkes RI, KARS Paripurna');
    setIsModalOpen(true);
  };

  const openEditModal = (srv: BusinessService) => {
    setEditingService(srv);
    setCategory(srv.category);
    setTitle(srv.title);
    setSlug(srv.slug);
    setSummary(srv.summary);
    setDescription(srv.description);
    setImageUrl(srv.image_url);
    setStandards(srv.standards.join(', '));
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const standardsArray = standards.split(',').map((s) => s.trim()).filter(Boolean);

    try {
      if (editingService) {
        const res = await fetch(`/api/services/${editingService.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category,
            title,
            slug,
            summary,
            description,
            image_url: imageUrl,
            standards: standardsArray,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setServices((prev) =>
            prev.map((s) => (s.id === editingService.id ? data.data : s))
          );
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category,
            title,
            slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            summary,
            description,
            image_url: imageUrl,
            specifications: { 'Kapasitas': 'Standar Medis Somaro' },
            standards: standardsArray,
            is_featured: true,
            order_index: services.length + 1,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setServices((prev) => [data.data, ...prev]);
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus layanan/produk ini?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-somaro-brown">
            Manajemen Unit Bisnis & Produk
          </h1>
          <p className="text-xs text-stone-500">
            Kelola katalog layanan rumah sakit, spesifikasi maklon kosmetik/farmasi, dan pengadaan alat kesehatan.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-somaro-brown hover:bg-somaro-brown-hover text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 text-somaro-khaki" /> Tambah Unit Layanan / Produk
        </button>
      </div>

      {/* Services Table */}
      <div className="rounded-3xl bg-white border border-somaro-khaki-light/60 shadow-apple overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50/80 border-b border-somaro-khaki-light/40 text-stone-400 uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-6 font-semibold">Pilar Bisnis</th>
                <th className="py-3.5 px-4 font-semibold">Judul Layanan / Produk</th>
                <th className="py-3.5 px-4 font-semibold">Ringkasan Spesifikasi</th>
                <th className="py-3.5 px-4 font-semibold">Standar Regulasi</th>
                <th className="py-3.5 px-6 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {services.map((srv) => (
                <tr key={srv.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-4 px-6 font-bold text-somaro-brown capitalize">
                    {srv.category.replace('_', ' ')}
                  </td>
                  <td className="py-4 px-4 font-semibold text-stone-800">
                    <div>{srv.title}</div>
                    <div className="text-[10px] text-stone-400 font-mono">/{srv.slug}</div>
                  </td>
                  <td className="py-4 px-4 text-stone-600 max-w-xs truncate">
                    {srv.summary}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {srv.standards.map((st, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] bg-somaro-khaki-soft text-somaro-brown border border-somaro-khaki-light"
                        >
                          {st}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(srv)}
                        className="p-1.5 rounded-lg text-stone-600 hover:text-somaro-brown hover:bg-stone-100"
                        title="Edit Layanan"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(srv.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                        title="Hapus Layanan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-somaro-khaki-light space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-somaro-brown">
                {editingService ? 'Sunting Unit Bisnis / Produk' : 'Tambah Unit Bisnis / Produk Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-somaro-brown">Pilar Kategori *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
                >
                  <option value="hospital">Hospital & Klinik Utama</option>
                  <option value="maklon_farmasi">Maklon Farmasi & Kosmetik (OEM/ODM)</option>
                  <option value="alat_kesehatan">Pengadaan Alat Kesehatan & Mesin</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-somaro-brown">Nama Layanan / Produk *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Manufaktur Serum Retinol CPOB"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-somaro-brown">Slug URL *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="manufaktur-serum-retinol-cpob"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-somaro-brown">Ringkasan Singkat (Summary) *</label>
                <textarea
                  rows={2}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Deskripsi singkat yang tampil di kartu pilar halaman beranda..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-somaro-brown">Deskripsi Lengkap *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Penjelasan mendalam mengenai fasilitas, keunggulan, atau teknologi..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-somaro-brown">URL Gambar Banner</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-somaro-brown">
                  Standar Regulasi (Pisahkan dengan tanda koma)
                </label>
                <input
                  type="text"
                  value={standards}
                  onChange={(e) => setStandards(e.target.value)}
                  placeholder="CPOB BPOM, Halal MUI, ISO 22716"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-stone-100 text-stone-700 font-semibold hover:bg-stone-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-full bg-somaro-brown text-white font-semibold hover:bg-somaro-brown-hover disabled:opacity-50"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Data Layanan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
