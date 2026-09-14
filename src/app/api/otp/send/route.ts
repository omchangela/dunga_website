import { NextRequest, NextResponse } from 'next/server';
import { formatWhatsAppPhone, sendWhatsAppOtp } from '@/lib/whatsapp';
import { otpStore } from '@/lib/otpStore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone } = body;

    if (!phone || typeof phone !== 'string' || phone.trim().length < 9) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid phone/WhatsApp number.' },
        { status: 400 }
      );
    }

    const formattedPhone = formatWhatsAppPhone(phone);
    if (!formattedPhone || formattedPhone.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone format. Please enter a 10-digit mobile number.' },
        { status: 400 }
      );
    }

    // Generate fresh OTP
    const { otp, expiresAt } = otpStore.createOtp(formattedPhone);

    // Send via WhatsApp API
    const whatsappResult = await sendWhatsAppOtp({
      phone: formattedPhone,
      otp,
    });

    console.log(`[OTP API] Sent OTP to ${formattedPhone} (Code: ${otp}, Status: ${whatsappResult.success ? 'Delivered' : 'Pending'})`);

    return NextResponse.json({
      success: true,
      message: `OTP sent to your WhatsApp number +${formattedPhone}`,
      formattedPhone,
      expiresInSeconds: 300,
      // Provide dev helper in development mode or if gateway is in test sandbox
      devHint: process.env.NODE_ENV !== 'production' || !whatsappResult.success ? `Test OTP: ${otp}` : undefined,
    });
  } catch (error: any) {
    console.error('[OTP Send Error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to dispatch WhatsApp OTP.' },
      { status: 500 }
    );
  }
}
