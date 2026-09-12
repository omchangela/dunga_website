import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'INR', customerName, customerEmail, customerPhone, items } = body;

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_Tb3ZNUbBizR1IT';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'DLXt55eoczc3HdGFJhHKy5re';

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valid amount is required.' },
        { status: 400 }
      );
    }

    // Razorpay requires amount in smallest currency unit (e.g. Paise for INR -> 100 paise = 1 INR)
    const amountInSubunits = Math.round(Number(amount) * 100);

    const receiptId = `rcpt_${Date.now().toString().slice(-8)}`;

    const authHeader = `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`;

    // Call official Razorpay Orders API
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify({
        amount: amountInSubunits,
        currency: currency.toUpperCase() === 'USD' ? 'USD' : 'INR',
        receipt: receiptId,
        notes: {
          customerName: customerName || 'Valued Client',
          customerEmail: customerEmail || '',
          customerPhone: customerPhone || '',
          itemCount: String(items?.length || 1),
          productNames: items?.map((i: any) => i.product?.title || i.title).join(', ').substring(0, 200) || 'Dunga Software Suite',
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Razorpay Orders API Error:', data);
      return NextResponse.json(
        { success: false, error: data?.error?.description || 'Failed to initialize payment with Razorpay.' },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
      keyId,
      receipt: receiptId,
    });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error while creating payment order.' },
      { status: 500 }
    );
  }
}
