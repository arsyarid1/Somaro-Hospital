import { NextResponse } from 'next/server';
import { getServices, createService } from '@/lib/data-store';

export async function GET() {
  const services = await getServices();
  return NextResponse.json({ success: true, data: services });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newService = await createService(body);
    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
