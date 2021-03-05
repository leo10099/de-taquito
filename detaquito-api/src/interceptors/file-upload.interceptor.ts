import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

// Types
import { FormDataFileMetadata } from '../typings';

@Injectable()
export class FileUploadValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req: FastifyRequest & {
      file: FormDataFileMetadata;
    } = context.switchToHttp().getRequest();
    if (!req.file) return next.handle();

    const { file } = req;

    if (file.fieldname !== 'file') {
      throw new HttpException('IMAGE_UPLOAD_UPLOAD_NOT_ALLOWED', 401);
    }

    if (file.mimetype.split('/').shift() !== 'image') {
      throw new HttpException('IMAGE_UPLOAD_WRONG_MIME_TYPE', 401);
    }

    if (file.size > 512000) {
      throw new HttpException('IMAGE_UPLOAD_IMAGE_OVER_ALLOWED_SIZE', 401);
    }

    return next.handle();
  }
}
