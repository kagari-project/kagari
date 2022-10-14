import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../../modules/auth/auth.module';
import { AuthService } from '../../modules/auth/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, AuthModule, MaterialUIModule],
  selector: 'app-navbar',
  template: `<mat-toolbar color="primary">
    <button mat-button (click)="handleClick()">
      <mat-icon>menu</mat-icon>
    </button>
    <span style="flex: 1 1 auto">Application</span>
    <button
      mat-button
      [matMenuTriggerFor]="menu"
      matBadge="0"
      matBadgePosition="after"
      matBadgeColor="accent"
    >
      <img
        style="height: 30px; width: 30px"
        src="https://ui-avatars.com/api/?rounded=true"
        alt=""
      />
      Username
    </button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item><mat-icon>settings</mat-icon>Setting</button>
      <button mat-menu-item><mat-icon>exit_to_app</mat-icon>Logout</button>
    </mat-menu>
  </mat-toolbar> `,
})
export class NavbarComponent {
  @Output()
  public menuClicked: EventEmitter<boolean> = new EventEmitter();

  public handleClick() {
    this.menuClicked.emit();
  }
}
