import { NextRequest, NextResponse } from 'next/server';
import { formatWhatsAppPhone } from '@/lib/whatsapp';
import { otpStore } from '@/lib/otpStore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phone, otp } = body;

    if (!phone || !otp) {
      return NextResponse.json(
        { success: false, error: 'Phone number and OTP code are required.' },
        { status: 400 }
      );
    }

    const formattedPhone = formatWhatsAppPhone(phone);
    const result = otpStore.verifyOtp(formattedPhone, String(otp));

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'OTP verification failed.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      formattedPhone,
      message: 'Phone number verified successfully via WhatsApp OTP!',
    });
  } catch (error: any) {
    console.error('[OTP Verify Error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error verifying OTP.' },
      { status: 500 }
    );
  }
}
