import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Services
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

// Types
import { MainConfig } from './config/configuration';

// Middleware
import { HttpMiddleware } from './middleware/http.middleware';
import { SecurityMiddleware } from './middleware/security.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  const configService = app.get(ConfigService);
  const PORT = configService.get(MainConfig.PORT);

  app.setGlobalPrefix('/api');

  HttpMiddleware.apply(app);
  SecurityMiddleware.apply(app);

  await app.listen(PORT, '0.0.0.0', () => {
    Logger.log(`De Taquito corriendo en el puerto ${PORT}`);
  });
}
bootstrap();
