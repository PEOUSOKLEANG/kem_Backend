// // src/twilio/twilio.service.ts
// import { Injectable, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Twilio } from 'twilio';

// @Injectable()
// export class TwilioService {
//   private readonly client: Twilio;
//   private readonly logger = new Logger(TwilioService.name);

//   constructor(private readonly configService: ConfigService) {
//     const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
//     const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
//     this.client = new Twilio(accountSid, authToken);
//   }

//   async sendSms(to: string, body: string): Promise<void> {
//     const from = this.configService.get<string>('TWILIO_PHONE_NUMBER');
//     try {
//       await this.client.messages.create({ from, to, body });
//       this.logger.log(`SMS sent to ${to}`);
//     } catch (error) {
//       this.logger.error(`Failed to send SMS to ${to}`, error);
//     }
//   }
// }
