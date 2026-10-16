import { NextResponse } from 'next/server';
import { getArticles, createArticle } from '@/lib/data-store';

export async function GET() {
  const articles = await getArticles();
  return NextResponse.json({ success: true, data: articles });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newArticle = await createArticle(body);
    return NextResponse.json({ success: true, data: newArticle }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
