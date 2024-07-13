// src/auth/email.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('email.host'),
      port: this.configService.get<number>('email.port'),
      secure: false,
      auth: {
        user: this.configService.get<string>('email.user'),
        pass: this.configService.get<string>('email.pass'),
      },
    });
  }

  async sendOTP(to: string, otp: string) {
    const mailOptions = {
      from: this.configService.get<string>('email.user'),
      to,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
