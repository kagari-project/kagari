import { RestTableComponent } from './rest-table.component';
import { Subscription } from 'rxjs';

export type ActionButtonDefinition = {
  type: 'text' | 'icon' | string;
  content: string;
  emit?: string;
};

type WithPaginatorParams<T = any> = {
  $page?: number;
  $pageSize?: number;
} & T;

export type ColumnDefinition = {
  prop: string;
  label?: string;
  buttons?: ActionButtonDefinition[];
};

export type ObjectOf<T> = { [key: string]: T };

export type FieldDefinition<T = any> = {
  label?: string;
  name: keyof (T & { withDeleted: boolean });
  value?: unknown;
  type: string;
  styles?: { field?: Record<string, any> };
  validators?: CallableFunction[];
};

export interface RestTableImpl<Model> {
  restTable: RestTableComponent | undefined;

  // options
  title?: string;
  searchOptions: Array<FieldDefinition>;
  workspaceOptions: Array<FieldDefinition>;
  tableOptions: Array<ColumnDefinition>;

  // row action event dispatcher
  onRowActionClick: (event: {
    emit: string;
    row: unknown;
    button: ActionButtonDefinition;
  }) => void;

  // CRUD functionalities
  getMany: (data: WithPaginatorParams) => Subscription;
  createOne: (data: Partial<Model>) => Subscription;
  updateOne: (data: {
    oldValue: Model;
    newValue: Partial<Model>;
  }) => Subscription;
  deleteOne: (row: Model) => Subscription;
  getOne?: (id: string) => Subscription;
}
