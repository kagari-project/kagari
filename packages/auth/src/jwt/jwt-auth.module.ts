import { DynamicModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModuleOptions } from '../types';

@Module({
  imports: [PassportModule],
})
export class JwtAuthModule {
  static forRoot(
    options: AuthModuleOptions<unknown, { jwt: any }>,
  ): DynamicModule {
    return {
      module: JwtAuthModule,
      imports: [JwtModule.register(options.jwt)],
      providers: [
        // {
        //   provide:
        // },
        ...this.createProviders(),
      ],
    };
  }

  static forRootAsync(): DynamicModule {
    return {
      module: JwtAuthModule,
      providers: [...this.createProviders()],
    };
  }

  private static createProviders() {
    return [];
  }
}
