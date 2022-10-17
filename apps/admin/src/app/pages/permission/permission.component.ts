import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { WithDrawerComponent } from '../../components/drawer-form/with-drawer.component';
import {
  ColumnDefinition,
  FieldDefinition,
  RestTableComponent,
  RestTableImpl,
} from '../../components/rest-table/rest-table.component';
import { PermissionModel } from '../../types';
import { HttpService } from '../../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { deserialize } from '@kagari/restful/dist/deserialize';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialUIModule,
    WithDrawerComponent,
    RestTableComponent,
  ],
  template: `
    <app-rest-table
      #restTable
      title="Permission"
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
export class PermissionComponent implements RestTableImpl<PermissionModel> {
  constructor(
    private http: HttpService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}
  @ViewChild('restTable') restTable: RestTableComponent | undefined;

  tableOptions: Array<ColumnDefinition> = [
    { prop: 'id' },
    { prop: 'name' },
    { prop: 'token' },
    { prop: 'createdAt' },
    { prop: 'updatedAt' },
    {
      prop: 'actions',
      buttons: [
        { type: 'icon', content: 'edit', emit: 'edit' },
        { type: 'icon', content: 'delete', emit: 'delete' },
      ],
    },
  ];

  searchOptions: Array<FieldDefinition<PermissionModel>> = [
    {
      name: 'name',
      type: 'text',
    },
    {
      label: 'WithDeleted',
      name: 'withDeleted',
      type: 'checkbox',
    },
  ];

  workspaceOptions: Array<FieldDefinition<PermissionModel>> = [
    {
      name: 'name',
      type: 'text',
      styles: {
        field: { marginRight: 0 },
      },
    },
    {
      name: 'token',
      type: 'text',
      styles: {
        field: { marginRight: 0 },
      },
    },
  ];

  createOne(data: Partial<PermissionModel>) {
    return this.http
      .request({
        method: 'put',
        url: '/api/permissions',
        body: data,
      })
      .subscribe(() => {
        this.restTable?.drawer?.close();
        this.restTable?.workspace.reset();
        this.snackBar.open('resource created', 'close', { duration: 3000 });
        this.restTable?.onReload();
      });
  }

  deleteOne(row: PermissionModel) {
    return this.http
      .request({
        method: 'delete',
        url: '/api/permissions/' + row.id,
      })
      .subscribe(() => {
        this.snackBar.open('resource deleted', 'close', { duration: 3000 });
        this.restTable?.onReload();
      });
  }

  getMany(
    data: { $page?: number; $pageSize?: number; withDeleted?: boolean } = {},
  ) {
    const { $page, $pageSize, withDeleted, ...rest } = data;
    return this.http
      .request<{ list: PermissionModel[]; total: number }>({
        method: 'get',
        url:
          '/api/permissions?' +
          deserialize({
            $page,
            $pageSize,
            $withDeleted: withDeleted,
            ...rest,
          }),
      })
      .subscribe(({ list, total }) => {
        this.restTable?.updateData({ list, total });
      });
  }

  onRowActionClick(event: { emit: string; row: unknown }): void {
    switch (event.emit) {
      case 'edit':
        this.restTable?.workspace.reset(event.row);
        this.restTable?.drawer?.open();
        break;
      case 'delete':
        this.dialog
          .open<ConfirmDialogComponent, { message: string }, boolean>(
            ConfirmDialogComponent,
          )
          .afterClosed()
          .subscribe((isConfirmed) => {
            if (isConfirmed) {
              this.deleteOne(event.row as PermissionModel);
            }
          });
        break;
      case 'deleteMany':
        this.dialog
          .open(ConfirmDialogComponent)
          .afterClosed()
          .subscribe((isConfirmed) => {
            if (isConfirmed) {
              const promises = (event.row as PermissionModel[]).map((row) =>
                lastValueFrom(
                  this.http.request({
                    method: 'delete',
                    url: '/api/permissions/' + row.id,
                  }),
                ),
              );
              Promise.all(promises).then(() => {
                this.snackBar.open('resource deleted', 'close', {
                  duration: 3000,
                });
                this.restTable?.onReload();
              });
            }
          });
        break;
    }
  }

  updateOne({
    oldValue,
    newValue,
  }: Record<'oldValue' | 'newValue', Partial<PermissionModel>>) {
    return this.http
      .request({
        method: 'patch',
        url: '/api/permissions/' + oldValue.id,
        body: newValue,
      })
      .subscribe(() => {
        this.restTable?.drawer?.close();
        this.restTable?.workspace.reset();
        this.snackBar.open('resource updated', 'close', { duration: 3000 });
        this.restTable?.onReload();
      });
  }
}
