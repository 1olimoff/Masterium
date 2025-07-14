export async function resendOtpApi({ phone_number, req_type }: { phone_number: string; req_type: string }) {
    // Bu yerda SMS xizmati orqali OTP qayta jo‘natish logikasi qo‘shiladi
    console.log(`Resending OTP to ${phone_number}`);
    return { success: true }; // Muvaffaqiyatli javob
  }