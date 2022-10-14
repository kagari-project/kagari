import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, MaterialUIModule],
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
      {{ username }}
    </button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="handleLogOut()">
        <mat-icon>exit_to_app</mat-icon>Logout
      </button>
    </mat-menu>
  </mat-toolbar> `,
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  @Output()
  public menuClicked: EventEmitter<boolean> = new EventEmitter();

  public handleClick() {
    this.menuClicked.emit();
  }
  get username() {
    return this.authService.userInfo?.username;
  }

  async handleLogOut() {
    this.authService.logout().subscribe(() => this.router.navigate(['/login']));
  }
}
