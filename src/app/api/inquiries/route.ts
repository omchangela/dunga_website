import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { inquiryStore } from '@/lib/inquiryStore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    // If PostgreSQL DATABASE_URL is configured, query from database
    if (process.env.DATABASE_URL) {
      const whereClause: any = {};
      if (status && status !== 'All') whereClause.status = status;
      if (type && type !== 'All') whereClause.type = type;
      if (search) {
        whereClause.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
          { company: { contains: search, mode: 'insensitive' } },
          { serviceOrProduct: { contains: search, mode: 'insensitive' } },
          { message: { contains: search, mode: 'insensitive' } },
          { inquiryCode: { contains: search, mode: 'insensitive' } },
        ];
      }

      const dbInquiries = await prisma.inquiry.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({ success: true, source: 'database', data: dbInquiries });
    }

    // Fallback: In-memory store
    const fallbackInquiries = inquiryStore.getInquiries();
    return NextResponse.json({ success: true, source: 'memory', data: fallbackInquiries });
  } catch (error: any) {
    console.error('Error fetching inquiries:', error);
    // Fallback to local store on DB error
    const fallbackInquiries = inquiryStore.getInquiries();
    return NextResponse.json({ success: true, source: 'fallback', data: fallbackInquiries });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      type = 'General',
      serviceOrProduct = 'General Inquiry',
      budget,
      message = '',
      priority = 'High',
      sourcePage = 'Website Form',
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and phone number are required.' },
        { status: 400 }
      );
    }

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const inquiryCode = `INQ-${randomId}`;

    let savedInquiry;

    if (process.env.DATABASE_URL) {
      savedInquiry = await prisma.inquiry.create({
        data: {
          inquiryCode,
          name,
          email,
          phone,
          company: company || null,
          type,
          serviceOrProduct,
          budget: budget || null,
          message,
          priority,
          sourcePage,
          status: 'New',
          notes: [`Inbound submission received via ${sourcePage} on ${new Date().toLocaleString()}`],
        },
      });
    } else {
      // Local store
      savedInquiry = inquiryStore.addInquiry({
        name,
        email,
        phone,
        company: company || undefined,
        type,
        serviceOrProduct,
        budget: budget || undefined,
        message,
        priority,
        sourcePage,
        status: 'New',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully. Dunga team will contact within 15 minutes.',
      inquiry: savedInquiry,
    });
  } catch (error: any) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to submit inquiry.' },
      { status: 500 }
    );
  }
}
