import { Module } from '@nestjs/common';

// Services
import { ConfigModule } from '@nestjs/config';

// Components
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [ConfigModule],
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
