import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MaterialUIModule } from '../../modules/material-ui.module';

const KEY = '__SIDEBAR_OPENED__';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MaterialUIModule,
    NavbarComponent,
    MatSidenavModule,
    SidebarComponent,
  ],
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
  public opened = localStorage.getItem(KEY) === '1';

  toggleSidebar() {
    this.opened = !this.opened;
    localStorage.setItem(KEY, this.opened ? '1' : '0');
  }
}
