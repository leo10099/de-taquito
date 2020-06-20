import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private getUpTime() {
    return process.uptime().toFixed();
  }

  private getTime() {
    return new Date().toTimeString();
  }

  getHealth(): string {
    return `Server running at ${this.getTime()}, uptime ${this.getUpTime()} seconds`;
  }
}
