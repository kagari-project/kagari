import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { SearchFormComponent } from '../search-form/search-form.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WithDrawerComponent } from '../drawer-form/with-drawer.component';
import {
  ColumnDefinition,
  ActionButtonDefinition,
  ObjectOf,
  FieldDefinition,
} from './types';

export * from './types';

@Component({
  standalone: true,
  selector: 'app-rest-table',
  imports: [
    CommonModule,
    MaterialUIModule,
    ReactiveFormsModule,
    SearchFormComponent,
    WithDrawerComponent,
  ],
  template: `
    <ng-template #formContentRenderer let-config>
      <div [formGroup]="config.formGroup">
        <div
          *ngFor="let item of config.options"
          style="display: inline-block;margin-right: 8px"
        >
          <mat-label [ngStyle]="{ marginRight: '8px' }">
            {{ item.label || (item.name | titlecase) }}
          </mat-label>
          <ng-container [ngSwitch]="item.type">
            <mat-form-field
              floatLabel="never"
              [ngStyle]="item.styles?.field"
              *ngSwitchCase="'text'"
            >
              <input matInput type="text" [formControlName]="item.name" />
            </mat-form-field>

            <mat-slide-toggle
              [ngStyle]="item.styles?.field"
              *ngSwitchCase="'checkbox'"
              [formControlName]="item.name"
            ></mat-slide-toggle>

            <mat-form-field floatLabel="never" *ngSwitchCase="'dateRange'">
              <mat-date-range-input [rangePicker]="picker">
                <input
                  matStartDate
                  placeholder="start date"
                  [formControlName]="item.name + '.from'"
                  (focus)="picker.open()"
                />
                <input
                  matEndDate
                  placeholder="end date"
                  [formControlName]="item.name + '.to'"
                  (focus)="picker.open()"
                />
              </mat-date-range-input>
              <mat-date-range-picker #picker></mat-date-range-picker>
            </mat-form-field>
          </ng-container>
        </div>
      </div>
    </ng-template>

    <with-drawer #drawer mode="side" [disableClose]="true" [hasBackdrop]="true">
      <h2 *ngIf="title" style="margin-top: 8px">{{ title }}</h2>
      <form
        style="width: 100%; position: relative"
        sideForm
        [formGroup]="workspace"
        (ngSubmit)="onWorkspaceSubmit()"
      >
        <button
          mat-icon-button
          style="float: right"
          type="button"
          (click)="drawer.close()"
        >
          <mat-icon>close</mat-icon>
        </button>

        <ng-container
          *ngTemplateOutlet="
            formContentRenderer;
            context: {
              $implicit: { formGroup: workspace, options: workspaceOptions }
            }
          "
        ></ng-container>

        <div>
          <button
            mat-raised-button
            type="submit"
            color="primary"
            style="margin-right: 8px"
          >
            Submit
          </button>
          <button mat-raised-button type="reset" color="accent">Reset</button>
        </div>
      </form>

      <mat-card
        [ngStyle]="{
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center'
        }"
      >
        <form
          [formGroup]="form"
          (ngSubmit)="onSearchSubmit()"
          style="flex: 1 auto"
        >
          <ng-container
            *ngTemplateOutlet="
              formContentRenderer;
              context: {
                $implicit: { formGroup: form, options: searchOptions }
              }
            "
          ></ng-container>
          <div>
            <button
              mat-raised-button
              type="submit"
              color="primary"
              style="margin-right: 8px"
            >
              Search
            </button>
            <button
              mat-raised-button
              type="reset"
              color="accent"
              style="margin-right: 8px"
            >
              Reset
            </button>
          </div>
        </form>
        <div>
          <button mat-icon-button type="button" (click)="onReload()">
            <mat-icon>cached</mat-icon>
          </button>
          <button
            mat-icon-button
            type="button"
            (click)="editingRow = undefined; workspace.reset(); drawer.open()"
          >
            <mat-icon>add</mat-icon>
          </button>
        </div>
      </mat-card>
      <table style="width: 100%" mat-table [dataSource]="dataSource">
        <ng-container
          *ngFor="let item of tableOptions"
          [matColumnDef]="item.prop"
        >
          <ng-template #displayTemplate let-item>
            <th mat-header-cell *matHeaderCellDef style="text-align: center">
              {{ item.label || item.prop }}
            </th>
            <td mat-cell *matCellDef="let element">{{ element[item.prop] }}</td>
          </ng-template>

          <ng-template #actionsTemplate let-item>
            <th mat-header-cell *matHeaderCellDef style="text-align: center">
              {{ item.label || item.prop }}
            </th>
            <td mat-cell *matCellDef="let element">
              <ng-container *ngFor="let button of item.buttons">
                <ng-container
                  *ngTemplateOutlet="
                    ButtonTemplate;
                    context: { $implicit: { button, element } }
                  "
                ></ng-container>
              </ng-container>
            </td>
          </ng-template>

          <ng-template #ButtonTemplate let-config>
            <button
              mat-icon-button
              type="button"
              (click)="
                editingRow = config.element;
                actionsClick.emit({
                  emit: config.button.emit,
                  row: config.element,
                  button: config.button
                })
              "
              *ngIf="config.button.type === 'icon'"
            >
              <mat-icon>{{ config.button.content }}</mat-icon>
            </button>
            <button
              mat-button
              type="button"
              *ngIf="config.button.type === 'text'"
            >
              {{ config.button.content }}
            </button>
          </ng-template>

          <ng-container
            *ngTemplateOutlet="
              item.buttons ? actionsTemplate : displayTemplate;
              context: { $implicit: item }
            "
          ></ng-container>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns"></tr>
      </table>
      <mat-paginator
        [length]="total"
        [pageSize]="pageSize"
        [pageIndex]="pageIndex"
        [pageSizeOptions]="pageSizeOptions"
        (page)="onPageChange($event)"
        aria-label="Select page"
      >
      </mat-paginator>
    </with-drawer>
  `,
})
export class RestTableComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  buildForm(config: any[]) {
    const options = config.reduce((prev, next) => {
      switch (next.type) {
        case 'dateRange':
          prev[next.name + '.from'] = [next.value, next.validators];
          prev[next.name + '.to'] = [next.value, next.validators];
          break;
        default:
          prev[next.name] = [next.value, next.validators];
      }

      return prev;
    }, {} as ObjectOf<[unknown, Array<CallableFunction> | undefined]>);
    return this.fb.group(options);
  }

  ngAfterViewInit() {
    setTimeout(() => this.getMany.emit(), 0);
  }

  ngOnInit(): void {
    this.columns = this.tableOptions.map((item) => item.prop);
    this.form = this.buildForm(this.searchOptions);
    this.workspace = this.buildForm(this.workspaceOptions);
  }
  columns: string[] = [];
  dataSource: unknown[] = [];
  total = 0;
  pageIndex = 0;
  form: FormGroup = new FormGroup({});
  workspace: FormGroup = new FormGroup({});
  editingRow: Partial<unknown> | undefined;

  @ViewChild('drawer') drawer: WithDrawerComponent | undefined;

  @Input() title: string | undefined;
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 25, 100];
  @Input() searchOptions: FieldDefinition[] = [];
  @Input() workspaceOptions: FieldDefinition[] = [];
  @Input() tableOptions: ColumnDefinition[] = [];

  @Output() actionsClick = new EventEmitter<{
    emit: string;
    row: unknown;
    button: ActionButtonDefinition;
  }>();
  @Output() reload = new EventEmitter();
  @Output() createOne = new EventEmitter<Partial<unknown>>();
  @Output() updateOne = new EventEmitter<{
    oldValue: Partial<unknown>;
    newValue: Partial<unknown>;
  }>();
  @Output() getMany = new EventEmitter<{
    $page?: number;
    $pageSize?: number;
  }>();

  private requestPayload() {
    if (!this.form.valid) {
      return {
        $page: this.pageIndex + 1,
        $pageSize: this.pageSize,
      };
    }
    return {
      ...this.form.value,
      $page: this.pageIndex + 1,
      $pageSize: this.pageSize,
    };
  }

  onSearchSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.getMany.emit(this.requestPayload());
  }

  onWorkspaceSubmit() {
    if (!this.workspace.valid) {
      return;
    }
    this.editingRow
      ? this.updateOne.emit({
          oldValue: this.editingRow,
          newValue: this.workspace.value,
        })
      : this.createOne.emit(this.workspace.value);
  }

  onPageChange({ pageSize, pageIndex }: PageEvent) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.getMany.emit(this.requestPayload());
  }

  onReload() {
    this.getMany.emit(this.requestPayload());
  }

  updateData({ list, total }: { list: unknown[]; total: number }) {
    this.dataSource = list;
    this.total = total;
  }
}
