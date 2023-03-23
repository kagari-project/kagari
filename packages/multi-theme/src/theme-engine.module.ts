import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import {
  ThemeEngineModuleDefaultOptions,
  ThemeEngineModuleOptions,
} from './options.interface';
import { THEME_ENGINE_MODULE_OPTIONS } from './tokens.constants';
import { ThemeService } from './theme.service';

@Module({})
export class ThemeEngineModule implements OnModuleInit {
  constructor(private theme: ThemeService) {}
  static forRoot(
    options: ThemeEngineModuleOptions = ThemeEngineModuleDefaultOptions,
  ): DynamicModule {
    return {
      module: ThemeEngineModule,
      exports: [ThemeService],
      providers: [
        {
          provide: THEME_ENGINE_MODULE_OPTIONS,
          useValue: { ...ThemeEngineModuleDefaultOptions, ...options },
        },
        {
          provide: ThemeService,
          useClass: ThemeService,
        },
      ],
    };
  }

  onModuleInit() {
    this.theme.setEngine();
  }
}
