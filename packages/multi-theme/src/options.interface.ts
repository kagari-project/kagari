import { HttpException } from '@nestjs/common';

export type ExpressHbsOptions = {
  blockHelperName?: string;
  contentHelperName?: string;
  defaultLayout?: string;
  extname?: string;
  i18n?: Record<string, any>;
  templateOptions?: Record<string, any>;
  beautify?: boolean;
};

export const ThemeEngineModuleDefaultOptions: ThemeEngineModuleOptions = {
  theme: 'default',
  engine: 'hbs',
  baseDir: 'views',
  ext: 'hbs',
  expressHbsOptions: {},
  helpers: {},
};

export type ThemeEngineModuleOptions = {
  theme?: string;
  engine?: string;
  baseDir?: string;
  ext?: string;
  expressHbsOptions?: ExpressHbsOptions;
  helpers?: {
    [key: string]: (...args) => unknown;
  };
};
