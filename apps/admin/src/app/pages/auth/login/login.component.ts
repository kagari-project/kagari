import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { MaterialUIModule } from '../../../material-ui.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthModule } from '../../../auth/auth.module';
import { AuthService } from '../../../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import { CommonModule } from '@angular/common';

export class TouchErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    MaterialUIModule,
    ReactiveFormsModule,
    RouterModule,
    AuthModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  title = 'Login';
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  matcher = new TouchErrorStateMatcher();

  @Input() error: string | null | undefined;

  // @Output() submitEM = new EventEmitter();

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
  ) {}

  onSubmit() {
    this.loginForm.get('username')?.hasError('required');
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: this.onLoginSuccess.bind(this),
        error: this.onLoginError.bind(this),
      });
    }
  }

  async onLoginSuccess(
    response:
      | { data: unknown; accessToken: string; refreshToken: string }
      | any,
  ) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    this.snackBar.open('login successfully', 'close', { duration: 3000 });
    await this.router.navigate(['/']);
  }

  onLoginError(err: HttpErrorResponse) {
    this.snackBar.open(err.message, 'close');
  }
}
