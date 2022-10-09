import { Component, OnInit } from '@angular/core';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { HttpService } from '../../http.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserModel } from '../../types';
import { deserialize } from '@kagari/restful/dist/deserialize';
import { Operations } from '@kagari/restful/dist/types';
import { getOperatedValue } from '@kagari/restful/dist/helpers';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialUIModule],
  selector: 'app-user',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'zh-cn' }],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  title = 'Users';
  columns = ['id', 'username', 'password', 'createdAt', 'updatedAt', 'actions'];
  dataSource: any[] = [];
  isLoading = false;

  pageSize = 10;
  pageIndex = 0;
  total = 0;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    from: new FormControl(''),
    to: new FormControl(''),
  });

  constructor(private http: HttpService) {}

  getMany() {
    this.isLoading = true;
    return this.http
      .request<{ list: UserModel[]; total: number }>({
        method: 'get',
        url:
          '/api/users?' +
          deserialize({
            $page: this.pageIndex + 1,
            $pageSize: this.pageSize,
            username: this.form.get('username')?.value,
            createdAt: getOperatedValue(Operations.bw, [
              this.form.get('from')?.value,
              this.form.get('to')?.value,
            ]),
          }),
      })
      .subscribe({
        next: ({ list, total }) => {
          this.dataSource = list;
          this.total = total;
        },
        complete: () => (this.isLoading = false),
      });
  }

  onCreate() {
    console.log(123);
  }

  onSubmit() {
    if (this.form.valid) {
      this.getMany();
    }
  }

  onPaginatorChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getMany();
  }

  ngOnInit(): void {
    this.getMany();
  }
}
