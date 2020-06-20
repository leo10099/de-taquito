import * as fastifyCookie from 'fastify-cookie';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

export class HttpMiddleware {
  static apply(app: NestFastifyApplication) {
    app.register(fastifyCookie);
    return app;
  }
}
