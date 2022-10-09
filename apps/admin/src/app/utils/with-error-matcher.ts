import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Injectable, Input } from '@angular/core';

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

export function WithErrorMatcher() {
  @Injectable()
  abstract class ReturnsClass {
    @Input() error: string | null | undefined;
    matcher = new TouchErrorStateMatcher();
  }

  return ReturnsClass;
}
