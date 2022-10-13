import { Component } from '@angular/core';
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
        <app-infinite-list></app-infinite-list>
      </div>
      <div class="middle">
        <button mat-icon-button><mat-icon>chevron_left</mat-icon></button>
        <button mat-icon-button><mat-icon>chevron_right</mat-icon></button>
      </div>
      <div class="right">
        <app-infinite-list></app-infinite-list>
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
export class TransferComponent {}
