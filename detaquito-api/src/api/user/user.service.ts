/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import * as argon2 from 'argon2';
import path from 'path';
import DataUri from 'datauri/parser';

// Components
import { User } from './user.entity';
import { UserRepository } from './user.repository';

// Models
import { Club } from '../club/club.entity';

// DTOs
import { CreateUserDtoLocalStrategy } from './dto/create.user.dto.local';
import { CreateUserDtoSocialStrategy } from './dto/create.user.dto.social';
import { EditUserDto } from './dto/edit.user.dto';

// Types
import { HashedPassword, Salt, FormDataFileMetadata } from '../../typings';

// Services
import { CloudinaryService } from 'src/services/Cloudinary/cloudinary.service';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    private cloudinary: CloudinaryService,
  ) {}

  async findOneByAttribute(filterCondition: { [key: string]: any }): Promise<User> {
    const user = await this.userRepo.findOne({
      where: {
        ...filterCondition,
      },
    });

    return user;
  }

  async findOneByEmail(emailAddress: string): Promise<User> {
    return await this.findOneByAttribute({ email: emailAddress });
  }

  async findOneByAlias(alias: string): Promise<User> {
    return await this.findOneByAttribute({ alias });
  }

  async createUserLocalStrategy(createUserDto: CreateUserDtoLocalStrategy): Promise<User> {
    // If secret present, hash password
    const { hashedPassword: secret, salt }: HashedPassword = await this.hashPassword(
      createUserDto.secret,
      32,
    );
    return await this.userRepo.insertUser({
      ...createUserDto,
      secret,
      salt: salt,
    });
  }

  async createUserSocialStrategy(createUserDto: CreateUserDtoSocialStrategy): Promise<User> {
    return await this.userRepo.insertUser(createUserDto);
  }

  async editUser(
    userId: number,
    updatePayload: EditUserDto | Partial<User>,
    file?: FormDataFileMetadata,
  ) {
    const currentUserData = await User.findOne(userId, { relations: ['club'] });
    let newUserData: any = {};

    newUserData = { ...currentUserData, ...updatePayload };

    if (updatePayload.club && typeof updatePayload.club === 'string' && updatePayload !== '0') {
      newUserData.club = await Club.findOne(parseInt(updatePayload.club, 10));
    }

    // If file present, upload avatar image to Cloudinary
    if (file) {
      try {
        const parser = new DataUri();
        const blob = parser.format(path.extname(file.originalname).toString(), file.buffer);
        const response: UploadApiResponse = await this.cloudinary.upload(blob.content, {
          folder: 'avatar',
          public_id: userId.toString(),
          overwrite: true,
        });
        newUserData = { ...newUserData, avatarUrl: response.url };
      } catch (e) {
        Logger.error(e, 'Cloudinary');
      }
    }

    if (!newUserData || !Object.keys(newUserData).length) return true;

    if (!file) {
      if (newUserData.club === undefined) {
        newUserData = { ...newUserData, avatarUrl: null };
      } else {
        const clubAvatar = await (await Club.findOne(Number(updatePayload.club))).logoUrl;
        newUserData = { ...newUserData, avatarUrl: clubAvatar };
      }
    }

    return await this.userRepo.updateUser(userId, newUserData);
  }

  // Helpers

  async hashPassword(password: string, saltWith: number): Promise<HashedPassword> {
    const salt: Salt = randomBytes(saltWith);
    const hashedPassword = await argon2.hash(password, { salt });

    return { hashedPassword, salt: salt.toString('hex') };
  }

  async verifyPassword(userPassword: string, passToVerify: string) {
    return await argon2.verify(userPassword, passToVerify);
  }
}
