// src/auth/otp.service.ts
import { Injectable } from '@nestjs/common';
import { EmailService } from './email.service';

@Injectable()
export class OtpService {
  private otpStore = new Map<string, string>(); // Store OTPs in memory for simplicity

  constructor(private emailService: EmailService) {}

  generateOTP(length: number = 6): string {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

  async sendOTP(email: string): Promise<void> {
    const otp = this.generateOTP();
    this.otpStore.set(email, otp); // Store OTP against email
    await this.emailService.sendOTP(email, otp);
    // need to save into database
  }

  verifyOTP(email: string, otp: string): boolean {
    
    const storedOtp = this.otpStore.get(email);
    if (storedOtp === otp) {
      this.otpStore.delete(email); // Remove OTP after verification
      return true;
    }
    return false;
  }
}
