import { Injectable } from '@nestjs/common';
import { DataSource, InjectDataSource } from '@kagari/database';

@Injectable()
export class AppService {
  constructor(@InjectDataSource() private ds: DataSource) {}
  getHello(): string {
    return 'Hello World!';
  }
}
