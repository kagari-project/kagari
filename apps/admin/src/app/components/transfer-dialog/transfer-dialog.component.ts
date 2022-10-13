import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from '../../http.service';
import { InfiniteListComponent } from '../infinite-list/infinite-list.component';
import { TransferComponent } from '../transfer/transfer.component';

@Component({
  selector: 'app-transfer-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MaterialUIModule,
    InfiniteListComponent,
    TransferComponent,
  ],
  template: `
    <h2 mat-dialog-title>Manage User's Roles</h2>
    <mat-dialog-content>
      <app-transfer></app-transfer>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button color="primary">Submit</button>
      <button mat-raised-button [mat-dialog-close]="false">Cancel</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      mat-dialog-content {
        height: 400px;
        width: 600px;
      }
    `,
  ],
})
export class TransferDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: unknown,
    private http: HttpService,
  ) {}
}
