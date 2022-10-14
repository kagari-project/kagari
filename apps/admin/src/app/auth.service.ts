import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { UserModel } from './types';

const baseURL = environment.baseURL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public userInfo: UserModel | undefined;

  setUserInfo(userInfo: UserModel) {
    this.userInfo = userInfo;
  }

  login(credentials: { username: string; password: string }) {
    return this.http.post(baseURL + '/auth/login', credentials);
  }

  register(form: unknown) {
    return this.http.post(baseURL + '/auth/register', form);
  }

  logout() {
    return this.http.post(baseURL + '/auth/logout', {});
  }
}
