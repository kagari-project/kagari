import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  RequestMethod,
} from '@nestjs/common';

export type RenderErrorFilterOptions = {
  getErrorPage: (e: Error | HttpException) => string;
  layout: string | boolean;
};

const RenderErrorFilterDefaultOptions: RenderErrorFilterOptions = {
  getErrorPage(e) {
    const status = e instanceof HttpException ? e.getStatus() : 500;
    return `pages/${status}`;
  },
  layout: false,
};

@Catch()
export class RenderErrorFilter implements ExceptionFilter {
  private excludes: { path: RegExp; method: RequestMethod }[] = [];
  constructor(
    private options: RenderErrorFilterOptions = RenderErrorFilterDefaultOptions,
  ) {}

  exclude(excludes) {
    this.excludes = excludes;
    return this;
  }
  catch(exception: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const resBody =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            statusCode: 500,
            message: exception.message,
            error: exception.message,
          };

    for (const exclude of this.excludes) {
      const methodId =
        RequestMethod[request.method.toUpperCase() as keyof RequestMethod];
      const matchesOnMethod =
        exclude.method === methodId || exclude.method === RequestMethod.ALL;
      const matchesOnUrl = exclude.path.test(request.url);
      if (matchesOnUrl && matchesOnMethod) {
        return response.status(status).json(resBody);
      }
    }

    const pageRes =
      resBody instanceof String
        ? { statusCode: status, message: resBody, error: exception }
        : (resBody as Record<string, any>);

    return response
      .status(status)
      .render(this.options.getErrorPage(exception), {
        ...pageRes,
        layout: this.options.layout,
      });
  }
}
