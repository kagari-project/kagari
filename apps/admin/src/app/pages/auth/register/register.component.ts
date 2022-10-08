import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialUIModule } from '../../../modules/material-ui.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [MaterialUIModule, ReactiveFormsModule, RouterModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  title = 'Register';

  public registerForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    passwordRepeat: new FormControl(''),
  });

  constructor(private snackbar: MatSnackBar, private router: Router) {}

  async onSubmit() {
    this.snackbar.open('register successfully');
    await this.router.navigate(['/auth/login']);
  }
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
}
