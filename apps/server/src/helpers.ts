import {
  ComposeAccessTokenPayload,
  ComposeRefreshTokenPayload,
  ValidateFunction,
  VerifyFunction,
} from '@kagari/auth';
import { UserEntity } from './core/entities/User.entity';
import { BadRequestException, ExecutionContext, Logger } from '@nestjs/common';
import { omit } from 'lodash';
import { CanActivateFunction } from '@kagari/rbac';
import * as Joi from 'joi';

export const validate: ValidateFunction = (credential) => {
  const { error, value } = Joi.object({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  }).validate(credential, { abortEarly: true, convert: true });
  if (error) {
    throw new BadRequestException(error.details[0]?.message);
  }
  return value;
};

export const verify: VerifyFunction<UserEntity> = async (repo, credential) => {
  const user = await repo.findOne({
    where: { username: credential.username },
  });

  if (!user) {
    throw new BadRequestException('user not found');
  }

  if (user.password !== credential.password) {
    throw new BadRequestException('incorrect password');
  }

  return omit(user, 'password') as UserEntity;
};

export const composeAccessTokenPayload: ComposeAccessTokenPayload<
  UserEntity
> = (userInfo) => ({ id: userInfo.id, username: userInfo.username });
export const composeRefreshTokenPayload: ComposeRefreshTokenPayload<
  UserEntity
> = (userInfo) => ({ id: userInfo.id, username: userInfo.username });

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
export const canActivate: CanActivateFunction = (context: ExecutionContext) => {
  Logger.debug('trying check rbac permission');
  return true;
};
