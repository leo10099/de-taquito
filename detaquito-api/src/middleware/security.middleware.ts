import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'fastify-rate-limit';

export class SecurityMiddleware {
  static apply(app: NestFastifyApplication) {
    app.enableCors({
      origin: process.env.WEB_APP_URL ?? 'http://localhost:3000',
      credentials: true,
    });

    app.use(helmet());

    app.register(rateLimit as any, {
      max: 100,
      timeWindow: '1 minute',
      addHeaders: {
        'x-ratelimit-limit': false,
        'x-ratelimit-remaining': false,
        'x-ratelimit-reset': false,
        'retry-after': false,
      },
    });

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
  }
}
