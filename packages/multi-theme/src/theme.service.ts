import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { THEME_ENGINE_MODULE_OPTIONS } from './tokens.constants';
import { ThemeEngineModuleOptions } from './options.interface';
import * as path from 'path';
import * as hbs from 'express-hbs';
import * as ServeStatic from 'serve-static';

@Injectable()
export class ThemeService {
  constructor(
    @Inject(THEME_ENGINE_MODULE_OPTIONS)
    public readonly options: ThemeEngineModuleOptions,
    private httpAdapterHost: HttpAdapterHost,
  ) {}

  // can be used in hbs helpers
  public logger = new Logger(ThemeService.name);

  get themeRoot() {
    return path.resolve(this.options.baseDir, this.options.theme);
  }

  getPage(template: string) {
    return path.join(this.options.theme, template);
  }

  setTheme(theme: string) {
    this.options.theme = theme;
    this.setEngine();
  }

  setEngine() {
    const app = this.httpAdapterHost.httpAdapter.getInstance();
    app.set('views', this.themeRoot);
    app.set('view engine', this.options.engine);
    app.engine(
      'hbs',
      hbs.express4({
        ...this.options.expressHbsOptions,
        partialsDir: [path.resolve(this.themeRoot, 'includes')],
        layoutsDir: path.resolve(this.themeRoot, 'layouts'),
        defaultLayout: path.resolve(this.themeRoot, 'layouts', 'base'),
      }),
    );

    // register helpers
    for (const helperName in this.options.helpers) {
      const helper = this.options.helpers[helperName];
      hbs.registerHelper(helperName, helper(this, hbs));
    }

    app.use(
      `/themes/${this.options.theme}/assets`,
      ServeStatic(path.resolve(this.themeRoot, 'assets')),
    );
  }
}
