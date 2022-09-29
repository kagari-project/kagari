import { JwtModuleOptions } from '@nestjs/jwt';
import {
  ComposeAccessTokenPayload,
  ComposeRefreshTokenPayload,
} from '../types';

export type ExtraOptions = {
  jwt: JwtModuleOptions;
  payload: {
    access: ComposeAccessTokenPayload<unknown>;
    refresh: ComposeRefreshTokenPayload<unknown>;
  };
};
