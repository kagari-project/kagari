import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    <h2 mat-dialog-title>{{ data?.title }}</h2>
    <mat-dialog-content>
      <app-transfer
        #transfer
        [fetchLeft]="data.fetchLeft"
        [fetchRight]="data.fetchRight"
      ></app-transfer>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button
        mat-raised-button
        color="primary"
        [mat-dialog-close]="{
          left: transfer?.left?.list,
          right: transfer?.right?.list
        }"
      >
        Submit
      </button>
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
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      fetchLeft: CallableFunction;
      fetchRight: CallableFunction;
    },
  ) {}

  @ViewChild('transfer') transfer: TransferComponent | undefined;
}
