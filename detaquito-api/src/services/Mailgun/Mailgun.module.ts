import { NodeMailgun } from 'ts-mailgun';
import { Module } from '@nestjs/common';

// Module
import { MailgunController } from './Mailgun.controller';
import { MailgunService } from './Mailgun.service';

// Services
import { ConfigService, ConfigModule } from '@nestjs/config';

// Types
import { MailgunConfig } from '../../config/configuration';

@Module({
  imports: [ConfigModule],
  controllers: [MailgunController],
  providers: [
    {
      provide: NodeMailgun,
      useFactory: async (configService: ConfigService) => {
        const apiKey = configService.get(MailgunConfig.MAILGUN_API_KEY);
        const domain = configService.get(MailgunConfig.MAILGUN_DOMAIN);
        const mailgun = new NodeMailgun(apiKey, domain);
        mailgun.fromEmail = 'no-reply@detaquito.club';
        mailgun.fromTitle = 'De Taquito - El Prode del Siglo XXI';

        return mailgun.init();
      },
      inject: [ConfigService],
    },
    { provide: MailgunService, useValue: MailgunService },
  ],
  exports: [MailgunService, NodeMailgun],
})
export class MailgunModule {}
