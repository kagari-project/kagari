import { DynamicModule, Module } from '@nestjs/common';
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
  static forRoot(options: TypeOrmModuleOptions): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      imports: [TypeOrmModule.forRoot(options)],
    };
  }

  static forRootAsync(options: TypeOrmModuleAsyncOptions): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      imports: [TypeOrmModule.forRootAsync(options)],
    };
  }

  static forFeature(...entities): DynamicModule {
    return TypeOrmModule.forFeature(...entities);
  }
}
