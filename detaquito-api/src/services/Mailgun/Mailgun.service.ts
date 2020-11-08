import { NodeMailgun } from 'ts-mailgun';

// Services
import { Injectable, InternalServerErrorException } from '@nestjs/common';

// Templates
import { buildPasswordRecoveryTemplate } from './templates';
import { ConfigService } from '@nestjs/config';

// Typings
import { MainConfig } from '../../config/configuration';

@Injectable()
export class MailgunService {
  constructor(private mailgun: NodeMailgun, private configService: ConfigService) {}

  async sendEmailWithRecoverPasswordToken(email: string, token: string) {
    try {
      const webUrl = this.configService.get(MainConfig.WEB_URL);
      const link = `${webUrl}/auth/forgot?token=${token}`;
      this.mailgun.unsubscribeLink = false;
      const template = buildPasswordRecoveryTemplate(link);

      await this.mailgun.sendFromTemplate(email, template);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
