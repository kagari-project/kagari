import { Injectable, Type } from '@nestjs/common';
import { DataSource, InjectDataSource, Repository } from '@kagari/database';

@Injectable()
export class AppService {
  constructor(@InjectDataSource() private ds: DataSource) {}
  getHello(): string {
    return 'Hello World!';
  }
}
