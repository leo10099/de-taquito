import { Module } from '@nestjs/common';

// Modules
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../../services/Cloudinary/Cloudinary.module';

// Components
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), CloudinaryModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
