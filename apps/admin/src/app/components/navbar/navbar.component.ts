import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialUIModule } from '../../material-ui.module';

@Component({
  standalone: true,
  imports: [MaterialUIModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output()
  public menuClicked: EventEmitter<boolean> = new EventEmitter();

  public handleClick() {
    this.menuClicked.emit();
  }
}
