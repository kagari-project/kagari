import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionButtonDefinition,
  ColumnDefinition,
  FieldDefinition,
  RestTableImpl,
} from '../../components/rest-table/types';
import { RoleModel } from '../../types';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { WithDrawerComponent } from '../../components/drawer-form/with-drawer.component';
import { RestTableComponent } from '../../components/rest-table/rest-table.component';
import { HttpService } from '../../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { deserialize } from '@kagari/restful/dist/deserialize';

@Component({
  selector: 'app-role',
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
      title="Role"
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
export class RoleComponent implements RestTableImpl<RoleModel> {
  constructor(private http: HttpService, private snackBar: MatSnackBar) {}

  @ViewChild('restTable') restTable: RestTableComponent | undefined;
  searchOptions: Array<FieldDefinition<RoleModel>> = [
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
  workspaceOptions: Array<FieldDefinition> = [
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
    },
  ];

  createOne(data: Partial<RoleModel>) {
    return this.http
      .request({
        method: 'put',
        url: '/api/roles',
        body: data,
      })
      .subscribe(() => {
        this.restTable?.drawer?.close();
        this.restTable?.workspace.reset();
        this.snackBar.open('resource created', 'close', { duration: 3000 });
        this.restTable?.onReload();
      });
  }

  deleteOne(row: RoleModel) {
    return this.http
      .request({
        method: 'delete',
        url: '/api/roles/' + row.id,
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
      .request<{ list: RoleModel[]; total: number }>({
        method: 'get',
        url:
          '/api/roles?' +
          deserialize({
            $page,
            $pageSize,
            $withDeleted: withDeleted,
            ...rest,
          }),
      })
      .subscribe(({ list, total }) => {
        console.log(list, total, this.restTable);
        this.restTable?.updateData({ list, total });
      });
  }

  onRowActionClick(event: {
    emit: string;
    row: unknown;
    button: ActionButtonDefinition;
  }): void {
    switch (event.emit) {
      case 'edit':
        this.restTable?.workspace.reset(event.row);
        this.restTable?.drawer?.open();
        break;
      case 'delete':
        this.deleteOne(event.row as RoleModel);
        break;
    }
  }

  updateOne({
    oldValue,
    newValue,
  }: Record<'oldValue' | 'newValue', Partial<RoleModel>>) {
    return this.http
      .request({
        method: 'patch',
        url: '/api/roles/' + oldValue.id,
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
