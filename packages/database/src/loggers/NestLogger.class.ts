/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger as LoggerType } from 'typeorm';
import { Logger } from '@nestjs/common';

type LoggerOptions = {
  context?: string;
};

export class NestLogger implements LoggerType {
  constructor(private options: LoggerOptions) {
    this.logger = new Logger(options.context || 'database');
  }

  private logger: Logger;

  log(level: 'log' | 'info' | 'warn', message: any) {
    this.logger.log(message);
  }

  logMigration(message: string) {
    this.logger.log(message);
  }

  logQuery(query: string, parameters?: any[]) {
    this.logger.log(this.composeSQL(query, parameters));
  }

  logQueryError(error: string | Error, query: string, parameters?: any[]) {
    this.logger.error(this.composeSQL(query, parameters));
    this.logger.error(error);
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    this.logger.warn(`${time} ${this.composeSQL(query, parameters)}`);
  }

  logSchemaBuild(message: string) {
    this.logger.log(message);
  }

  private composeSQL(query: string, params?: any[]) {
    return params ? `${query} @ ${JSON.stringify(params)}` : `${query}`;
  }
}
