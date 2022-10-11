import {
  ComposeAccessTokenPayload,
  ComposeRefreshTokenPayload,
  ValidateFunction,
} from '@kagari/auth';
import { UserEntity } from './core/entities/User.entity';
import { BadRequestException, ExecutionContext, Logger } from '@nestjs/common';
import { omit } from 'lodash';
import { CanActivateFunction } from '@kagari/rbac';
import * as Joi from 'joi';

export const validate: ValidateFunction<UserEntity> = async (
  repo,
  credential,
) => {
  const { error, value } = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  }).validate(credential);
  if (error) {
    throw new BadRequestException({ error });
  }
  const user = await repo.findOne({
    where: { username: value.username },
  });

  if (!user) {
    throw new BadRequestException({ error: 'user not found' });
  }

  if (user.password !== value.password) {
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

export const canActivate: CanActivateFunction = (context: ExecutionContext) => {
  Logger.debug('trying check rbac permission');
  return true;
};
