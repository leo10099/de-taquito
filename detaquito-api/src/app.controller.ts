import { Controller, Get } from '@nestjs/common';

// Module
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHello(): string {
    return this.appService.getHealth();
  }
}
