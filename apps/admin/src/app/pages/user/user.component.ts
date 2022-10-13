import { Component, ViewChild } from '@angular/core';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { HttpService } from '../../http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserModel } from '../../types';
import { deserialize } from '@kagari/restful/dist/deserialize';
import { Operations } from '@kagari/restful/dist/types';
import { getOperatedValue } from '@kagari/restful/dist/helpers';
import { CommonModule } from '@angular/common';
import { format } from 'date-fns';
import { WithDrawerComponent } from '../../components/drawer-form/with-drawer.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FieldDefinition,
  RestTableComponent,
  RestTableImpl,
} from '../../components/rest-table/rest-table.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialUIModule,
    WithDrawerComponent,
    RestTableComponent,
  ],
  selector: 'app-user',
  template: `
    <app-rest-table
      #restTable
      title="User"
      [searchOptions]="searchOptions"
      [workspaceOptions]="workspaceOptions"
      [tableOptions]="tableOptions"
      (getMany)="getMany($event)"
      (createOne)="createOne($event)"
      (updateOne)="updateOne($event)"
      (actionsClick)="onRowActionClick($event)"
    ></app-rest-table>
  `,
})
export class UserComponent implements RestTableImpl<UserModel> {
  constructor(
    private http: HttpService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  searchOptions: FieldDefinition<UserModel>[] = [
    {
      name: 'username',
      type: 'text',
    },
    {
      label: 'CreatedAt',
      name: 'createdAt',
      type: 'dateRange',
    },
    {
      label: 'WithDeleted',
      name: 'withDeleted',
      type: 'checkbox',
    },
  ];

  workspaceOptions: FieldDefinition<UserModel>[] = [
    {
      name: 'username',
      type: 'text',
      styles: {
        field: { marginRight: 0 },
      },
    },
    {
      name: 'password',
      type: 'text',
      styles: {
        field: { marginRight: 0 },
      },
    },
  ];

  tableOptions = [
    { prop: 'id' },
    { prop: 'username' },
    { prop: 'password' },
    { prop: 'createdAt' },
    { prop: 'updatedAt' },
    {
      prop: 'actions',
      buttons: [
        { type: 'icon', content: 'edit', emit: 'edit' },
        { type: 'icon', content: 'settings', emit: 'setRoles' },
        { type: 'icon', content: 'delete', emit: 'delete' },
      ],
    },
  ];

  @ViewChild('restTable') restTable: RestTableComponent | undefined;

  private formatTime(date: Date | undefined) {
    if (!date) {
      return undefined;
    }
    try {
      return format(date, 'yyyy-MM-dd');
    } catch (e) {
      return undefined;
    }
  }

  onRowActionClick(event: { emit: string; row: unknown }) {
    switch (event.emit) {
      case 'edit':
        this.restTable?.workspace.reset(event.row);
        this.restTable?.drawer?.open();
        break;
      case 'delete':
        this.dialog
          .open(ConfirmDialogComponent)
          .afterClosed()
          .subscribe((isConfirmed) => {
            if (isConfirmed) {
              this.deleteOne(event.row as UserModel);
            }
          });
        break;
    }
  }

  getMany(
    data: {
      $page?: number;
      $pageSize?: number;
      username?: string;
      withDeleted?: boolean;
      ['createdAt.to']?: Date;
      ['createdAt.from']?: Date;
    } = {},
  ) {
    const { $page, $pageSize } = data;
    return this.http
      .request<{ list: UserModel[]; total: number }>({
        method: 'get',
        url:
          '/api/users?' +
          deserialize({
            $page: $page,
            $pageSize: $pageSize,
            $withDeleted: data.withDeleted,
            username: data.username,
            createdAt: getOperatedValue(Operations.bw, [
              this.formatTime(data['createdAt.from']) as string,
              this.formatTime(data['createdAt.to']) as string,
            ]),
          }),
      })
      .subscribe(({ list, total }) => {
        this.restTable?.updateData({ list, total });
      });
  }

  deleteOne(row: UserModel) {
    return this.http
      .request({
        method: 'delete',
        url: '/api/users/' + row.id,
      })
      .subscribe(() => {
        this.snackBar.open('resource deleted', 'close', { duration: 3000 });
        this.restTable?.onReload();
      });
  }

  createOne(form: Partial<UserModel>) {
    return this.http
      .request({
        method: 'put',
        url: '/api/users',
        body: form,
      })
      .subscribe(() => {
        this.restTable?.drawer?.close();
        this.restTable?.workspace?.reset();
        this.snackBar.open('resource created', 'close', { duration: 3000 });
        this.restTable?.onReload();
      });
  }

  updateOne({
    oldValue,
    newValue,
  }: Record<'oldValue' | 'newValue', Partial<UserModel>>) {
    return this.http
      .request({
        method: 'patch',
        url: '/api/users/' + oldValue.id,
        body: newValue,
      })
      .subscribe(() => {
        this.restTable?.drawer?.close();
        this.restTable?.workspace?.reset();
        this.snackBar.open('resource updated', 'close', { duration: 3000 });
        this.restTable?.onReload();
      });
  }
}
