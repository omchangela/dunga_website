// WhatsApp Business API Helper via WoxAPI
export function formatWhatsAppPhone(phone: string): string {
  if (!phone) return '';
  // Strip all non-digit characters
  let digits = phone.replace(/\D/g, '');

  // If 10 digits (Standard Indian Mobile Number), prepend '91'
  if (digits.length === 10) {
    return '91' + digits;
  }

  // If 11 digits starting with 0 (e.g. 09876543210)
  if (digits.length === 11 && digits.startsWith('0')) {
    return '91' + digits.slice(1);
  }

  return digits;
}

export interface SendWhatsAppOtpOptions {
  phone: string;
  otp: string;
}

export async function sendWhatsAppOtp({ phone, otp }: SendWhatsAppOtpOptions): Promise<{ success: boolean; data?: any; error?: string }> {
  const formattedPhone = formatWhatsAppPhone(phone);
  const apiUrl = process.env.WOXAPI_BASE_URL || 'https://crm.woxapi.in/api/v2/whatsapp-business/messages';
  const apiKey = process.env.WOXAPI_API_KEY || 'fb291bf29374e66ed0237db0d57fc1658e7a2cd2201ef6068f9d0f7e24ba9bca';
  const phoneNumberId = process.env.WOXAPI_PHONE_NUMBER_ID || '1345340821990898';
  const wabaId = process.env.WOXAPI_WABA_ID || '1553227169362291';
  const templateName = process.env.WOXAPI_OTP_TEMPLATE_NAME || 'otp';

  if (!formattedPhone) {
    return { success: false, error: 'Invalid phone number format.' };
  }

  try {
    // Exact WoxAPI WhatsApp Business Template Payload structure
    const payload = {
      to: formattedPhone,
      phoneNoId: phoneNumberId,
      type: 'template',
      name: templateName,
      language: 'en',
      bodyParams: [otp],
      buttons: [
        {
          type: 'button',
          sub_type: 'url',
          text: otp,
        },
      ],
    };

    console.log(`[WhatsApp OTP] Dispatching OTP ${otp} to ${formattedPhone} via WoxAPI (phoneNoId: ${phoneNumberId})...`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      console.warn('[WhatsApp OTP Provider Response]:', responseData);
      return {
        success: false,
        error: responseData?.message || responseData?.error?.message || 'Provider gateway response warning',
        data: responseData,
      };
    }

    console.log(`[WhatsApp OTP] Successfully dispatched OTP to ${formattedPhone}`, responseData);
    return { success: true, data: responseData };
  } catch (err: any) {
    console.error('[WhatsApp OTP System Error]:', err);
    return { success: false, error: err?.message || 'Internal connection error to WhatsApp gateway.' };
  }
}
