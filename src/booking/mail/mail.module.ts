import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
       host: 'smtp.gmail.com',
    port: 465, // Recommended for Gmail
    secure: true,
        auth: {
          user: 'gulfishar.provab@gmail.com',
          pass: 'yepckifbxgqendnl',
        },
      },
      defaults: {
        from: '"Carisma Rentals" <no-reply@yourdomain.com>',
      },
      template: {
        dir: join(__dirname, 'templates'), // Where your HTML files will live
        adapter: new HandlebarsAdapter(), 
        options: {
          strict: false,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}