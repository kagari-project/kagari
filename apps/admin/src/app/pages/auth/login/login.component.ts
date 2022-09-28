import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialUIModule } from '../../../material-ui.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [MaterialUIModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  title = 'Login';
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  async onSubmit() {
    this.snackBar.open('login successfully');
    localStorage.setItem(
      'userInfo',
      JSON.stringify({ id: 1, username: 'foobar' }),
    );
    await this.router.navigate(['/']);
  }
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
}
