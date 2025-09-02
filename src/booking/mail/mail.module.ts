import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: 'gulfisha9886@gmail.com',
          pass: 'jqws uyyb kvog izqk',
        },
      },
      defaults: {
        from: '"Car Booking App" <no-reply@yourdomain.com>',
      },
      template: {
        dir: join(__dirname, '/templates'),  
        adapter: new (require('@nestjs-modules/mailer/dist/adapters/handlebars.adapter').HandlebarsAdapter)(),
        options: { strict: true },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
