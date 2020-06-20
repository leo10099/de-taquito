import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as argon2 from 'argon2';

// Components
import { User } from './user.entity';
import { UserRepository } from './user.repository';

// DTOs
import { CreateUserDtoLocalStrategy } from './dto/create.user.dto.local';
import { CreateUserDtoSocialStrategy } from './dto/create.user.dto.social';

// Types
import { HashedPassword, Salt } from '../../typings';

@Injectable()
export class UserService {
  constructor(public userRepo: UserRepository) {}

  async findOneByEmail(emailAddress: string): Promise<User> {
    return await this.userRepo.findOneByAttribute({ email: emailAddress });
  }

  async findOneByAlias(alias: string): Promise<User> {
    return await this.userRepo.findOneByAttribute({ alias });
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

  async editUser(userId: number, updatePayload: Partial<User>) {
    return await this.userRepo.updateUser(userId, updatePayload);
  }

  // Helpers

  private async hashPassword(password: string, saltWith: number): Promise<HashedPassword> {
    const salt: Salt = randomBytes(saltWith);
    const hashedPassword = await argon2.hash(password, { salt });

    return { hashedPassword, salt: salt.toString('hex') };
  }

  async verifyPassword(userPassword: string, passToVerify: string) {
    return await argon2.verify(userPassword, passToVerify);
  }
}
