import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { PageEvent } from '@angular/material/paginator';
import { HttpService } from '../../http.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserModel } from '../../types';
import { deserialize } from '@kagari/restful/dist/deserialize';
import { Operations } from '@kagari/restful/dist/types';
import { getOperatedValue } from '@kagari/restful/dist/helpers';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';
import { WithDrawerComponent } from '../../components/drawer-form/with-drawer.component';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialUIModule,
    WithDrawerComponent,
    WithDrawerComponent,
  ],
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  title = 'Users';
  columns = ['id', 'username', 'password', 'createdAt', 'updatedAt', 'actions'];
  dataSource: UserModel[] = [];
  isLoading = false;

  pageSize = 10;
  pageIndex = 0;
  total = 0;

  searchForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    from: new FormControl(),
    to: new FormControl(),
  });

  @ViewChild('drawer') drawer!: WithDrawerComponent;

  constructor(private http: HttpService) {}

  formatTime(date: Date) {
    try {
      return format(date, 'yyyy-MM-dd');
    } catch (e) {
      return undefined;
    }
  }

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
            username: this.searchForm.get('username')?.value,
            createdAt: getOperatedValue(Operations.bw, [
              this.formatTime(this.searchForm.get('from')?.value) as string,
              this.formatTime(this.searchForm.get('to')?.value) as string,
            ]),
          }),
      })
      .subscribe({
        next: ({ list, total }) => {
          this.dataSource = list;
          this.total = total;
        },
        error: () => (this.isLoading = false),
        complete: () => (this.isLoading = false),
      });
  }

  onCreate() {
    this.drawer.open();
  }

  onCloseSideForm() {
    this.drawer.close();
  }

  onSearchSubmit() {
    if (this.searchForm.valid) {
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
