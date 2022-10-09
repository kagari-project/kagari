import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { CommonModule } from '@angular/common';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';

@Component({
  standalone: true,
  selector: 'with-drawer',
  template: `
    <mat-drawer-container style="height: 100%" [hasBackdrop]="hasBackdrop">
      <mat-drawer
        #drawer
        [disableClose]="disableClose"
        [mode]="mode"
        [position]="position"
        [ngStyle]="{ width: width }"
      >
        <ng-content select="[sideForm]"></ng-content>
      </mat-drawer>
      <mat-drawer-content>
        <ng-content></ng-content>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  imports: [CommonModule, MaterialUIModule],
})
export class WithDrawerComponent {
  @Input() width = '10vw';
  @Input() mode: MatDrawerMode = 'push';
  @Input() hasBackdrop = false;
  @Input() disableClose = false;
  @Input() position: 'start' | 'end' = 'end';

  @ViewChild('drawer') drawer!: MatDrawer;

  open() {
    return this.drawer.open();
  }
  close() {
    return this.drawer.close();
  }
}
