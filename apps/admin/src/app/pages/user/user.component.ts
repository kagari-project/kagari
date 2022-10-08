import { Component, OnInit } from '@angular/core';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpService } from '../../http.service';

@Component({
  standalone: true,
  imports: [MaterialUIModule],
  selector: 'app-user',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'zh-cn' }],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  title = 'Users';
  columns = ['id', 'username', 'password', 'createdAt', 'updatedAt', 'actions'];
  dataSource: any[] = [];

  constructor(private http: HttpService) {}

  getMany() {
    return this.http.request<{ list: any[]; total: any[] }>({
      method: 'get',
      url: '/api/users',
    });
  }

  ngOnInit(): void {
    this.getMany().subscribe({
      next: ({ list }) => {
        this.dataSource = list;
      },
    });
  }
}
