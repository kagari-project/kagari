import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { InfiniteListComponent } from '../infinite-list/infinite-list.component';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, MaterialUIModule, InfiniteListComponent],
  template: `
    <div class="container">
      <div class="left">
        <app-infinite-list #left [fetch]="fetchLeft">
          <ng-template #labelTemplate let-item
            >{{ item.name }} | {{ item.token }}</ng-template
          >
        </app-infinite-list>
      </div>
      <div class="middle">
        <button mat-icon-button (click)="left2right()">
          <mat-icon>chevron_right</mat-icon>
        </button>
        <button mat-icon-button (click)="right2left()">
          <mat-icon>chevron_left</mat-icon>
        </button>
      </div>
      <div class="right">
        <app-infinite-list #right [fetch]="fetchRight">
          <ng-template #labelTemplate let-item
            >{{ item.name }} | {{ item.token }}</ng-template
          >
        </app-infinite-list>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        height: 100%;
        display: flex;
        .left,
        .right {
          flex: 1 1 auto;
          //overflow-y: scroll;
          height: 100%;
        }
        .middle {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    `,
  ],
})
export class TransferComponent {
  @Input() fetchLeft!: CallableFunction;
  @Input() fetchRight!: CallableFunction;

  @ViewChild('left') left!: InfiniteListComponent;
  @ViewChild('right') right!: InfiniteListComponent;

  left2right() {
    this.right.push(...this.left.selection.selected);
    this.left.selection.setSelection([]);
  }
  right2left() {
    this.left.push(...this.right.selection.selected);
    this.right.remove(...this.right.selection.selected);
  }
}
