'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  Clock,
  Eye,
} from 'lucide-react';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Regulasi & Kepatuhan');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/articles');
      const data = await res.json();
      if (data.data) {
        setArticles(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const openCreateModal = () => {
    setEditingArticle(null);
    setTitle('');
    setSlug('');
    setCategory('Regulasi & Kepatuhan');
    setExcerpt('');
    setContent('');
    setThumbnailUrl('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80');
    setIsPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (art: Article) => {
    setEditingArticle(art);
    setTitle(art.title);
    setSlug(art.slug);
    setCategory(art.category);
    setExcerpt(art.excerpt);
    setContent(art.content);
    setThumbnailUrl(art.thumbnail_url);
    setIsPublished(art.is_published);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingArticle) {
        const res = await fetch(`/api/articles/${editingArticle.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            slug,
            category,
            excerpt,
            content,
            thumbnail_url: thumbnailUrl,
            is_published: isPublished,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setArticles((prev) =>
            prev.map((a) => (a.id === editingArticle.id ? data.data : a))
          );
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            category,
            excerpt,
            content,
            thumbnail_url: thumbnailUrl,
            author_name: 'Tim Regulatoris Somaro',
            is_published: isPublished,
            published_at: new Date().toISOString(),
          }),
        });
        const data = await res.json();
        if (data.success) {
          setArticles((prev) => [data.data, ...prev]);
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePublishStatus = async (art: Article) => {
    try {
      const res = await fetch(`/api/articles/${art.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: !art.is_published }),
      });
      const data = await res.json();
      if (data.success) {
        setArticles((prev) =>
          prev.map((a) => (a.id === art.id ? data.data : a))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
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
            Manajemen Berita & Regulasi Medis
          </h1>
          <p className="text-xs text-stone-500">
            Publikasikan artikel kesehatan, pembaruan audit CPOB/CPKB, serta panduan kepatuhan Kemenkes.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-somaro-brown hover:bg-somaro-brown-hover text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 text-somaro-khaki" /> Tulis Publikasi Baru
        </button>
      </div>

      {/* Articles Table */}
      <div className="rounded-3xl bg-white border border-somaro-khaki-light/60 shadow-apple overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50/80 border-b border-somaro-khaki-light/40 text-stone-400 uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-6 font-semibold">Judul Publikasi</th>
                <th className="py-3.5 px-4 font-semibold">Kategori</th>
                <th className="py-3.5 px-4 font-semibold">Status Tayang</th>
                <th className="py-3.5 px-4 font-semibold">Penulis</th>
                <th className="py-3.5 px-6 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {articles.map((art) => (
                <tr key={art.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-4 px-6 font-bold text-somaro-brown max-w-sm truncate">
                    <div>{art.title}</div>
                    <div className="text-[10px] text-stone-400 font-mono">/berita/{art.slug}</div>
                  </td>
                  <td className="py-4 px-4 font-medium text-stone-700">
                    <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-[10px] font-semibold">
                      {art.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      type="button"
                      onClick={() => togglePublishStatus(art)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-colors ${
                        art.is_published
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-stone-100 text-stone-600 border-stone-300'
                      }`}
                    >
                      {art.is_published ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Published
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-stone-500" /> Draft
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-4 text-stone-500">{art.author_name}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(art)}
                        className="p-1.5 rounded-lg text-stone-600 hover:text-somaro-brown hover:bg-stone-100"
                        title="Edit Artikel"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(art.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                        title="Hapus Artikel"
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

      {/* Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-somaro-khaki-light space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-somaro-brown">
                {editingArticle ? 'Sunting Artikel Publikasi' : 'Tulis Publikasi Artikel Baru'}
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
                <label className="font-semibold text-somaro-brown">Judul Artikel *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Pembaruan Standar Mutu CPOB 2026"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-somaro-brown">Kategori Artikel *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
                >
                  <option value="Regulasi & Kepatuhan">Regulasi & Kepatuhan</option>
                  <option value="Inovasi Klinis">Inovasi Klinis</option>
                  <option value="Teknologi Medis">Teknologi Medis</option>
                  <option value="Edukasi Kesehatan">Edukasi Kesehatan</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-somaro-brown">Kutipan Singkat (Excerpt) *</label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat untuk preview kartu..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-somaro-brown">Konten Lengkap Publikasi *</label>
                <textarea
                  rows={5}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan isi artikel dan poin-poin penjelasan secara lengkap..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-somaro-brown">URL Gambar Thumbnail</label>
                <input
                  type="url"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-somaro-surface-subtle border border-somaro-khaki-light text-somaro-brown focus:outline-none focus:ring-2 focus:ring-somaro-brown"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="publishToggle"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-somaro-brown focus:ring-somaro-brown"
                />
                <label htmlFor="publishToggle" className="font-semibold text-somaro-brown cursor-pointer">
                  Langsung Terbitkan (Status: Published)
                </label>
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
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Artikel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
