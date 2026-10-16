'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  FileText,
  Sliders,
  LogOut,
  ExternalLink,
  ShieldAlert,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If on login page, do not show admin sidebar
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-somaro-surface-subtle">{children}</div>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  const navItems = [
    {
      title: 'Ringkasan Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Pesan Masuk (Inquiries)',
      href: '/admin/inquiries',
      icon: Inbox,
    },
    {
      title: 'Unit Bisnis & Layanan',
      href: '/admin/services',
      icon: Briefcase,
    },
    {
      title: 'Berita & Regulasi',
      href: '/admin/articles',
      icon: FileText,
    },
    {
      title: 'CMS Halaman Statis',
      href: '/admin/cms',
      icon: Sliders,
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50/70 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col bg-somaro-brown text-white shrink-0 border-r border-somaro-brown-medium justify-between shadow-xl">
        <div className="p-6">
          {/* Holding Admin Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-somaro-khaki flex items-center justify-center text-somaro-brown font-serif font-bold text-xl shadow-md">
              S
            </div>
            <div>
              <div className="font-semibold text-sm tracking-tight text-white">
                SOMARO MEDIKA
              </div>
              <div className="text-[10px] text-somaro-khaki uppercase tracking-widest font-medium">
                Admin Management Portal
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <NextLink
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 group',
                    isActive
                      ? 'bg-somaro-khaki text-somaro-brown shadow-sm'
                      : 'text-stone-300 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn('w-4 h-4', isActive ? 'text-somaro-brown' : 'text-somaro-khaki')} />
                    <span>{item.title}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-somaro-brown" />}
                </NextLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions in Sidebar */}
        <div className="p-6 border-t border-white/10 space-y-3">
          <NextLink
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs text-stone-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-somaro-khaki" /> Lihat Website Publik
            </span>
          </NextLink>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-somaro-khaki-light/40 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-somaro-brown hover:bg-stone-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold text-somaro-khaki-dark uppercase tracking-wider hidden sm:inline">
              PT Somaro Medika Utama • Central Control Panel
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-somaro-brown">Super Administrator</div>
              <div className="text-[10px] text-stone-500">admin@somaro.co.id</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-somaro-brown text-somaro-khaki flex items-center justify-center font-bold text-xs shadow-sm">
              SA
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Sheet */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 bg-somaro-brown text-white p-6 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-somaro-khaki text-somaro-brown font-bold flex items-center justify-center font-serif text-sm">
                    S
                  </div>
                  <span className="font-bold text-xs">SOMARO ADMIN</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <NextLink
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold',
                        isActive ? 'bg-somaro-khaki text-somaro-brown' : 'text-stone-300 hover:bg-white/10'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </NextLink>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-500/10"
              >
                <LogOut className="w-4 h-4" /> Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
