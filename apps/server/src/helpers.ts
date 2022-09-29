import {
  ComposeAccessTokenPayload,
  ComposeRefreshTokenPayload,
  ValidateFunction,
} from '@kagari/auth';
import { UserEntity } from './core/entities/User.entity';
import { BadRequestException } from '@nestjs/common';
import { omit } from 'lodash';

export const validate: ValidateFunction<UserEntity> = async (
  repo,
  credential,
) => {
  const user = await repo.findOne({
    where: { username: credential.username },
  });

  if (!user) {
    throw new BadRequestException({ error: 'user not found' });
  }

  if (user.password !== credential.password) {
    throw new BadRequestException({ error: 'incorrect password' });
  }

  return omit(user, 'password') as UserEntity;
};

export const composeAccessTokenPayload: ComposeAccessTokenPayload<
  UserEntity
> = (userInfo) => ({ id: userInfo.id, username: userInfo.username });
export const composeRefreshTokenPayload: ComposeRefreshTokenPayload<
  UserEntity
> = (userInfo) => ({ id: userInfo.id, username: userInfo.username });
