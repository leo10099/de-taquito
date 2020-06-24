import { ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

// Components
import { User } from './user.entity';

// DTOs
import { CreateUserDtoLocalStrategy } from './dto/create.user.dto.local';
import { CreateUserDtoSocialStrategy } from './dto/create.user.dto.social';

// Errors
import { UserErrors } from './user.errors';

// Types
import { DatabaseQueryError } from '../../typings/DatabaseQueryError';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async insertUser(createUserDto: CreateUserDtoLocalStrategy | CreateUserDtoSocialStrategy) {
    const user: User = await new User(createUserDto).save().catch((e: DatabaseQueryError) => {
      if (e.detail.includes('alias')) {
        throw new ConflictException(UserErrors.USER_ERROR_ALIAS_EXISTS);
      }
      throw e.message;
    });
    return user;
  }

  async updateUser(userId: number, updatePayload: Partial<User>) {
    await this.update(userId, {
      ...updatePayload,
    }).catch((e: DatabaseQueryError) => {
      if (e.detail.includes('alias')) {
        throw new ConflictException(UserErrors.USER_ERROR_ALIAS_EXISTS);
      }
      throw e.message;
    });

    return await this.findOne({ id: userId });
  }
}
