import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  async deserializeUser(payload: any, done: CallableFunction) {
    // step in when login
    done(null, payload);
  }

  serializeUser(user: any, done: CallableFunction): any {
    // step in every request
    done(null, user);
  }
}
