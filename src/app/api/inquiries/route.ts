import { NextResponse } from 'next/server';
import { getInquiries, createInquiry } from '@/lib/data-store';
import { z } from 'zod';

const inquirySchema = z.object({
  full_name: z.string().min(2, 'Nama minimal 2 karakter'),
  company_name: z.string().min(2, 'Nama institusi/perusahaan wajib diisi'),
  email: z.string().email('Format email tidak valid'),
  phone: z.string().min(8, 'Nomor telepon minimal 8 digit'),
  service_interest: z.string().min(1, 'Pilih pilar unit bisnis'),
  message: z.string().min(10, 'Pesan kemitraan minimal 10 karakter'),
});

export async function GET() {
  const inquiries = await getInquiries();
  return NextResponse.json({ success: true, data: inquiries });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = inquirySchema.parse(body);

    const newInquiry = await createInquiry(validatedData);
    return NextResponse.json({
      success: true,
      message: 'Permohonan kemitraan Anda telah berhasil terkirim. Tim holding kami akan segera menghubungi Anda.',
      data: newInquiry,
    }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message || 'Internal error' }, { status: 500 });
  }
}
