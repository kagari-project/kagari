import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MaterialUIModule],
  template: `
    <h2 mat-dialog-title>Needs Your Confirmation</h2>
    <mat-dialog-content>{{ data?.message || '' }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button [mat-dialog-close]="true" color="primary">
        Confirm
      </button>
      <button mat-raised-button [mat-dialog-close]="false">Close</button>
    </mat-dialog-actions>
  `,
  styles: [],
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message?: string }) {}
}
