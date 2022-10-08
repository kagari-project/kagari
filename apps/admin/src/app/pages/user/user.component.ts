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
  columns = ['id', 'name', 'createdAt', 'updatedAt', 'actions'];
  dataSource = [
    { id: 1, name: 'foobar', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 2, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 3, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 4, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 5, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 6, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 7, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 8, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 9, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
    { id: 10, name: 'lorem', createdAt: '2022-01-01', updatedAt: '2022-01-01' },
  ];

  constructor(private http: HttpService) {}

  getMany() {
    return this.http.request({ method: 'get', url: '/api/users' });
  }

  ngOnInit(): void {
    this.getMany().subscribe();
  }
}
