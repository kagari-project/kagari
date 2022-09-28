import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private router: Router) {}
  async canActivate() {
    // example code
    if (!localStorage.getItem('userInfo')) {
      await this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
