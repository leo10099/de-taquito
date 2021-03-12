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

    if (file.fieldname !== 'avatar') {
      throw new HttpException('IMAGE_UPLOAD_UPLOAD_NOT_ALLOWED', 403);
    }

    if (file.mimetype.split('/').shift() !== 'image') {
      throw new HttpException('IMAGE_UPLOAD_WRONG_MIME_TYPE', 403);
    }

    if (file.size > 1048576) {
      throw new HttpException('IMAGE_UPLOAD_IMAGE_OVER_ALLOWED_SIZE', 403);
    }

    return next.handle();
  }
}
