import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails,
    } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'DLXt55eoczc3HdGFJhHKy5re';

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Incomplete payment authentication parameters.' },
        { status: 400 }
      );
    }

    // Verify HMAC-SHA256 signature from Razorpay
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (!isSignatureValid) {
      console.error('Razorpay signature verification failed:', {
        expected: expectedSignature,
        received: razorpay_signature,
      });
      return NextResponse.json(
        { success: false, error: 'Payment signature verification failed. Transaction was not verified.' },
        { status: 400 }
      );
    }

    // Payment Verified Successfully!
    const orderNumber = `DNG-${Date.now().toString().slice(-6)}`;
    const items = orderDetails?.items || [];
    
    // Generate genuine license keys for purchased products
    const generatedLicenses = items.map((item: any) => {
      const p = item.product || item;
      const slug = p.slug || 'software';
      const version = p.version || '2.4.0';
      const randomKey = `DUNGA-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      
      return {
        productId: p.id || slug,
        productTitle: p.title || 'Dunga Software Suite',
        productSlug: slug,
        thumbnailUrl: p.thumbnailUrl || '/images/products/placeholder.jpg',
        version,
        licenseKey: randomKey,
        licenseType: item.licenseType || 'Regular Single Domain',
        downloadUrl: `https://downloads.dungatechnologies.com/packages/${slug}-v${version}.zip`,
        setupStatus: item.selectedAddons?.some((a: any) => a.id?.includes('setup')) ? 'PENDING' : 'NOT_REQUESTED',
      };
    });

    const primaryProductTitle = items.length > 0 
      ? items.map((i: any) => i.product?.title || i.title).join(', ')
      : 'Dunga Technologies Source Code License';

    const primaryLicenseKey = generatedLicenses.length > 0 
      ? generatedLicenses[0].licenseKey 
      : `DNGA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Store in PostgreSQL database if available
    let dbOrderRecord = null;
    if (process.env.DATABASE_URL) {
      try {
        dbOrderRecord = await prisma.order.create({
          data: {
            orderNumber,
            customerName: orderDetails?.customerName || 'Client',
            email: orderDetails?.customerEmail || 'client@example.com',
            phone: orderDetails?.customerPhone || null,
            productTitle: primaryProductTitle,
            licenseType: items[0]?.licenseType || 'Regular Commercial',
            amountINR: Math.round(orderDetails?.amountINR || orderDetails?.totalAmount || 0),
            amountUSD: Math.round(orderDetails?.amountUSD || Math.round((orderDetails?.totalAmount || 0) / 83)),
            currency: orderDetails?.currency || 'INR',
            paymentMethod: 'Razorpay',
            paymentId: razorpay_payment_id,
            licenseKey: primaryLicenseKey,
            status: 'Completed',
          },
        });
      } catch (dbErr) {
        console.error('Error saving order to PostgreSQL database:', dbErr);
      }
    }

    const verifiedReceipt = {
      orderNumber,
      customerName: orderDetails?.customerName,
      customerEmail: orderDetails?.customerEmail,
      customerPhone: orderDetails?.customerPhone,
      customerCompany: orderDetails?.customerCompany,
      customerGstin: orderDetails?.customerGstin,
      currency: orderDetails?.currency || 'INR',
      items,
      subtotal: orderDetails?.subtotal,
      addonsTotal: orderDetails?.addonsTotal,
      discount: orderDetails?.discount,
      totalAmount: orderDetails?.totalAmount,
      paymentMethod: 'Razorpay',
      paymentStatus: 'PAID',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      paidAt: new Date().toISOString(),
      generatedLicenses,
      dbOrderId: dbOrderRecord?.id || null,
    };

    return NextResponse.json({
      success: true,
      message: 'Payment verified and order finalized successfully.',
      receipt: verifiedReceipt,
    });
  } catch (error: any) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Payment verification processing error.' },
      { status: 500 }
    );
  }
}
