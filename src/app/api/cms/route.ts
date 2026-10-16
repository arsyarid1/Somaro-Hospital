import { NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent } from '@/lib/data-store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key') || 'hero';
  const content = await getSiteContent(key);
  return NextResponse.json({ success: true, data: content });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { section_key, title, subtitle, content_body, metadata } = body;
    const updated = await updateSiteContent(section_key, {
      title,
      subtitle,
      content_body,
      metadata,
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
