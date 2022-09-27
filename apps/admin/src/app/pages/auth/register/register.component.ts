import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialUIModule } from '../../../material-ui.module';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  imports: [MaterialUIModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class RegisterComponent {
  title = 'Register';

  public form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
}
