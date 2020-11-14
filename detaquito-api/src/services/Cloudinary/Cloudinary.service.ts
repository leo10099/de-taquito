/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, Inject } from '@nestjs/common';
import { Cloudinary } from './cloudinary.provider';
import { UploadApiOptions } from 'cloudinary';

// Services
import { ConfigService } from '@nestjs/config';

// Types
import { CloudinaryConfig } from '../../config/configuration';

@Injectable()
export class CloudinaryService {
  private v2;
  constructor(
    @Inject(Cloudinary)
    private cloudinary,
    private readonly configService: ConfigService,
  ) {
    this.cloudinary.v2.config({
      cloud_name: this.configService.get(CloudinaryConfig.CLOUDINARY_CLOUD_NAME),
      api_key: this.configService.get(CloudinaryConfig.CLOUDINARY_API_KEY),
      api_secret: this.configService.get(CloudinaryConfig.CLOUDINARY_API_SECRET),
    });
    this.v2 = cloudinary.v2;
  }

  async upload(file: string, options: UploadApiOptions) {
    return await this.v2.uploader.upload(file, options);
  }
}
