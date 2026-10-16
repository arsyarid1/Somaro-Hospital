'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError(data.message || 'Login gagal. Periksa kembali email dan kata sandi Anda.');
      }
    } catch {
      setError('Terjadi kendala koneksi saat menghubungi server.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('admin@somaro.co.id');
    setPassword('SomaroMedika2026!');
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-white via-somaro-surface-subtle to-somaro-khaki-soft/40">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-somaro-khaki-light/80 shadow-apple-hover space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-somaro-brown text-somaro-khaki flex items-center justify-center font-serif font-bold text-2xl mx-auto shadow-md">
              S
            </div>
            <h1 className="text-2xl font-bold text-somaro-brown tracking-tight">
              Portal Admin Holding
            </h1>
            <p className="text-xs text-stone-500">
              Sistem Manajemen Terpadu PT Somaro Medika Utama
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-somaro-brown">
                Email Administrator
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@somaro.co.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl text-xs bg-somaro-surface-subtle border border-somaro-khaki-light focus:outline-none focus:ring-2 focus:ring-somaro-brown text-somaro-brown"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-somaro-brown">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl text-xs bg-somaro-surface-subtle border border-somaro-khaki-light focus:outline-none focus:ring-2 focus:ring-somaro-brown text-somaro-brown"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-full bg-somaro-brown hover:bg-somaro-brown-hover text-white text-xs font-bold tracking-wide shadow-apple transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Memverifikasi Autentikasi...</span>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5 text-somaro-khaki" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="pt-4 border-t border-somaro-khaki-light/50">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full py-2.5 px-3 rounded-2xl bg-somaro-khaki-soft hover:bg-somaro-khaki-light/60 border border-somaro-khaki-light text-somaro-brown text-[11px] font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-somaro-brown" />
              <span>Gunakan Akun Kredensial Demo Admin</span>
            </button>
            <div className="text-[10px] text-center text-stone-400 mt-2">
              Email: <code>admin@somaro.co.id</code> • Pass: <code>SomaroMedika2026!</code>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <NextLink
            href="/"
            className="text-xs text-stone-500 hover:text-somaro-brown font-medium"
          >
            ← Kembali ke Website Publik PT Somaro Medika Utama
          </NextLink>
        </div>
      </div>
    </div>
  );
}
