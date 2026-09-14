// In-Memory OTP Store with 5-minute TTL and Verification Tokens
export interface OtpRecord {
  otp: string;
  phone: string;
  expiresAt: number; // Unix timestamp in ms
  attempts: number;
  verified: boolean;
  verifiedAt?: number;
}

// Global store to persist across API route invocations in Node runtime
const globalStore = global as unknown as { __dunga_otp_store?: Map<string, OtpRecord> };

if (!globalStore.__dunga_otp_store) {
  globalStore.__dunga_otp_store = new Map<string, OtpRecord>();
}

const otpMap = globalStore.__dunga_otp_store;

export const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
export const MAX_ATTEMPTS = 5;

export const otpStore = {
  // Generate and store new 6-digit numeric OTP
  createOtp(phone: string): { otp: string; expiresAt: number } {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + OTP_TTL_MS;

    otpMap.set(phone, {
      otp,
      phone,
      expiresAt,
      attempts: 0,
      verified: false,
    });

    return { otp, expiresAt };
  },

  // Verify submitted OTP
  verifyOtp(phone: string, submittedOtp: string): { success: boolean; error?: string } {
    const record = otpMap.get(phone);

    if (!record) {
      return { success: false, error: 'No OTP requested for this phone number. Please request a new OTP.' };
    }

    if (Date.now() > record.expiresAt) {
      otpMap.delete(phone);
      return { success: false, error: 'OTP has expired (valid for 5 minutes). Please request a new one.' };
    }

    if (record.attempts >= MAX_ATTEMPTS) {
      return { success: false, error: 'Too many incorrect attempts. Please request a new OTP.' };
    }

    if (record.otp !== submittedOtp.trim()) {
      record.attempts += 1;
      return { success: false, error: `Invalid OTP. ${MAX_ATTEMPTS - record.attempts} attempts remaining.` };
    }

    // Success
    record.verified = true;
    record.verifiedAt = Date.now();
    return { success: true };
  },

  // Check if phone is verified
  isVerified(phone: string): boolean {
    const record = otpMap.get(phone);
    if (!record || !record.verified) return false;
    // Verified session valid for 30 minutes
    if (Date.now() - (record.verifiedAt || 0) > 30 * 60 * 1000) {
      return false;
    }
    return true;
  },

  // Get current record
  get(phone: string): OtpRecord | undefined {
    return otpMap.get(phone);
  },

  // Clear phone record
  clear(phone: string) {
    otpMap.delete(phone);
  },
};
