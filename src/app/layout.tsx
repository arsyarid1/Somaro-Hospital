import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'PT Somaro Medika Utama | Healthcare & Medical Holding Group',
  description:
    'Holding kesehatan dan medis terdepan yang mengintegrasikan layanan hospital, maklon & distribusi farmasi-estetika, serta teknologi alat kesehatan mutakhir.',
  keywords: [
    'Somaro Medika Utama',
    'Holding Kesehatan',
    'Rumah Sakit',
    'Maklon Kosmetik BPOM',
    'Maklon Skincare',
    'Pengadaan Alat Kesehatan',
    'CPOB CPKB',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-somaro-surface-subtle text-somaro-brown antialiased selection:bg-somaro-khaki selection:text-somaro-brown">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
