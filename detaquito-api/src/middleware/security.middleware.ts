import { NestFastifyApplication } from '@nestjs/platform-fastify';
import * as helmet from 'helmet';
import * as rateLimit from 'fastify-rate-limit';

export class SecurityMiddleware {
  static apply(app: NestFastifyApplication) {
    app.enableCors({
      origin: process.env.ALLOWED_CORS?.split(',') ?? 'http://localhost:3000',
      credentials: true,
    });
    app.use(helmet());
    app.register(rateLimit, {
      max: 100,
      timeWindow: '1 minute',
      addHeaders: {
        'x-ratelimit-limit': false,
        'x-ratelimit-remaining': false,
        'x-ratelimit-reset': false,
        'retry-after': false,
      },
    });
  }
}
