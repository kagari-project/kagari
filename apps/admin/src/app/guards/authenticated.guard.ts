import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpService } from '../http.service';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { lastValueFrom, of } from 'rxjs';
import { UserModel } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private router: Router,
    private http: HttpService,
    private authService: AuthService,
  ) {}
  async canActivate() {
    const getProfile = this.http
      .request<UserModel>({ method: 'get', url: `/auth/profile` })
      .pipe(
        map((res) => {
          this.authService.setUserInfo(res);
          return true;
        }),
        catchError(() => {
          this.router.navigate(['/login']);
          return of(false);
        }),
      );
    return await lastValueFrom(getProfile);
  }
}
