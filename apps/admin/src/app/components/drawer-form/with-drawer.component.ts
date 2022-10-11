import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { CommonModule } from '@angular/common';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';

@Component({
  standalone: true,
  selector: 'with-drawer',
  template: `
    <mat-drawer-container
      [ngStyle]="styles.container"
      [hasBackdrop]="hasBackdrop"
    >
      <mat-drawer
        #drawer
        [disableClose]="disableClose"
        [mode]="mode"
        [position]="position"
        [ngStyle]="styles.drawer"
      >
        <ng-content select="[sideForm]"></ng-content>
      </mat-drawer>
      <mat-drawer-content [ngStyle]="styles.content">
        <ng-content></ng-content>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  imports: [CommonModule, MaterialUIModule],
})
export class WithDrawerComponent {
  @Input() mode: MatDrawerMode = 'push';
  @Input() hasBackdrop = false;
  @Input() disableClose = false;
  @Input() position: 'start' | 'end' = 'end';
  @Input() styles: Partial<Record<'container' | 'drawer' | 'content', any>> = {
    container: { height: '100%' },
    drawer: { width: '25vw', padding: '8px' },
    content: { padding: '0 10px' },
  };

  @ViewChild('drawer') drawer!: MatDrawer;

  open() {
    return this.drawer.open();
  }
  close() {
    return this.drawer.close();
  }
}
