export type ExpressHbsOptions = {
  blockHelperName?: string;
  contentHelperName?: string;
  defaultLayout?: string;
  extname?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  i18n?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
