import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (process.env.DATABASE_URL) {
      const whereClause: any = {};
      if (email) whereClause.email = email;

      const orders = await prisma.order.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({ success: true, data: orders });
    }

    return NextResponse.json({
      success: true,
      data: [
        {
          id: 'ORD-8821',
          orderNumber: 'ORD-8821',
          customerName: 'Aarav Singhania',
          email: 'aarav@realtysmart.in',
          productTitle: 'OmniFlow AI CRM & Telecaller Suite',
          licenseType: 'Extended Commercial',
          amountINR: 18499,
          amountUSD: 249,
          currency: 'INR',
          paymentMethod: 'Razorpay',
          status: 'Completed',
          licenseKey: 'DNGA-OF-9942-8812-XTND',
          createdAt: new Date().toISOString(),
        },
      ],
    });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch orders.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      email,
      phone,
      productTitle,
      licenseType = 'Regular Single Domain',
      amountINR,
      amountUSD,
      currency = 'INR',
      paymentMethod = 'Razorpay',
      paymentId,
    } = body;

    if (!customerName || !email || !productTitle) {
      return NextResponse.json(
        { success: false, error: 'Customer name, email, and product are required.' },
        { status: 400 }
      );
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${randomNum}`;
    const licenseKey = `DNGA-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${randomNum}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    if (process.env.DATABASE_URL) {
      const order = await prisma.order.create({
        data: {
          orderNumber,
          customerName,
          email,
          phone: phone || null,
          productTitle,
          licenseType,
          amountINR: amountINR || 4999,
          amountUSD: amountUSD || 69,
          currency,
          paymentMethod,
          paymentId: paymentId || null,
          licenseKey,
          status: 'Completed',
        },
      });

      return NextResponse.json({
        success: true,
        order,
        licenseKey,
        message: 'Order created and license key generated successfully.',
      });
    }

    return NextResponse.json({
      success: true,
      order: {
        orderNumber,
        customerName,
        email,
        productTitle,
        licenseType,
        licenseKey,
        status: 'Completed',
      },
      licenseKey,
      message: 'Order created in test mode.',
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to process order.' },
      { status: 500 }
    );
  }
}
