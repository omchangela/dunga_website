import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { inquiryStore, InquiryStatus } from '@/lib/inquiryStore';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, note } = body;

    if (process.env.DATABASE_URL) {
      const updateData: any = {};
      if (status) updateData.status = status;
      if (note) {
        updateData.notes = {
          push: note,
        };
      }

      const updated = await prisma.inquiry.update({
        where: { id },
        data: updateData,
      });

      return NextResponse.json({ success: true, inquiry: updated });
    }

    // Fallback store
    if (status) {
      inquiryStore.updateInquiryStatus(id, status as InquiryStatus);
    }
    if (note) {
      inquiryStore.addInquiryNote(id, note);
    }

    return NextResponse.json({ success: true, message: 'Inquiry updated successfully.' });
  } catch (error: any) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to update inquiry.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (process.env.DATABASE_URL) {
      await prisma.inquiry.delete({
        where: { id },
      });
    } else {
      inquiryStore.deleteInquiry(id);
    }

    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (error: any) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to delete inquiry.' },
      { status: 500 }
    );
  }
}
