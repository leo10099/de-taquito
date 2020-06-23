import { Controller } from '@nestjs/common';

// Components
import { MailgunService } from './Mailgun.service';

@Controller('/mailgun')
export class MailgunController {
  constructor(private readonly mailgunService: MailgunService) {}
}
