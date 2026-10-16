import { NextResponse } from 'next/server';
import { updateInquiryStatus } from '@/lib/data-store';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, admin_notes } = body;

    const updated = await updateInquiryStatus(id, status, admin_notes);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
