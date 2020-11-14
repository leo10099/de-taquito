import * as fastifyMulter from 'fastify-multer';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

export class FileUploadMiddleware {
  static apply(app: NestFastifyApplication) {
    app.register(fastifyMulter.contentParser);
    return app;
  }
}
