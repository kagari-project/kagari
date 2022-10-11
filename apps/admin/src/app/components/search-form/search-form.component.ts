import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, MaterialUIModule, ReactiveFormsModule],
  selector: 'app-search-form',
  template: `<mat-card style="margin-bottom: 10px">
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit.emit(form)"
      style="min-height: 40px;display: inline-block"
    >
      <div #fields><ng-content select="[fields]"></ng-content></div>

      <div #buttons style="display: inline-block">
        <ng-content select="[buttons]"></ng-content>
      </div>
      <ng-container *ngIf="!buttons.hasChildNodes()">
        <button mat-button type="submit" color="primary">
          <mat-icon>search</mat-icon>
          Search
        </button>
        <button mat-button type="reset" color="accent">
          <mat-icon>highlight_off</mat-icon>
          Reset
        </button>
      </ng-container>
    </form>
    <div #suffix style="display: inline-block">
      <ng-content select="[suffix]"></ng-content>
    </div>
    <ng-container *ngIf="!suffix.hasChildNodes()">
      <div style="display: inline-block;float: right">
        <button mat-icon-button type="button" (click)="onReload.emit(form)">
          <mat-icon>cached</mat-icon>
        </button>

        <button mat-icon-button type="button" (click)="onAdd.emit()">
          <mat-icon>add</mat-icon>
        </button>
      </div>
    </ng-container>
  </mat-card>`,
})
export class SearchFormComponent {
  @Output() onSubmit = new EventEmitter();

  @Output() onAdd = new EventEmitter();

  @Output() onReload = new EventEmitter();

  @Input() form: FormGroup = new FormGroup({});
}
