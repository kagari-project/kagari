import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUIModule } from '../../modules/material-ui.module';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, MaterialUIModule, ReactiveFormsModule],
  selector: 'app-search-form',
  template: `<mat-card style="margin-bottom: 10px">
    <form [formGroup]="form" (ngSubmit)="onSubmit.emit(form)">
      <ng-content #fields select="[fields]"></ng-content>

      <div #buttons id="buttons" style="display: inline-block">
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

      <div #suffix id="suffix" style="display: inline-block">
        <ng-content select="[suffix]"></ng-content>
      </div>
      <ng-container *ngIf="!suffix.hasChildNodes()">
        <button
          mat-icon-button
          type="button"
          style="float: right"
          (click)="onReload.emit(form)"
        >
          <mat-icon>cached</mat-icon>
        </button>

        <button
          style="float: right"
          mat-icon-button
          type="button"
          (click)="onAdd.emit()"
        >
          <mat-icon>add</mat-icon>
        </button>
      </ng-container>
    </form>
  </mat-card>`,
})
export class SearchFormComponent {
  @Output() onSubmit = new EventEmitter();

  @Output() onAdd = new EventEmitter();

  @Output() onReload = new EventEmitter();

  @Input() form: FormGroup = new FormGroup({});
}
