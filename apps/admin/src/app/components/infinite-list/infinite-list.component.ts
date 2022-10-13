import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUIModule } from '../../modules/material-ui.module';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import {
  delay,
  filter,
  finalize,
  map,
  pairwise,
  throttleTime,
} from 'rxjs/operators';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-infinite-list',
  standalone: true,
  imports: [CommonModule, MaterialUIModule, ScrollingModule],
  template: `
    <mat-form-field [ngStyle]="{ width: '100%' }" floatLabel="never">
      <mat-label>Search</mat-label>
      <input matInput type="text" />
    </mat-form-field>
    <mat-selection-list [ngStyle]="{ height: '100%', paddingTop: 0 }" dense>
      <cdk-virtual-scroll-viewport
        #scroller
        [ngStyle]="{ height: '100%' }"
        [itemSize]="itemSize"
      >
        <mat-list-option
          *cdkVirtualFor="let item of list"
          [value]="item"
          [selected]="selection.isSelected(item)"
          >{{ item.name }} | {{ item.token }}
        </mat-list-option>
        <mat-progress-bar *ngIf="isLoading" mode="indeterminate">
        </mat-progress-bar>
      </cdk-virtual-scroll-viewport>
    </mat-selection-list>
  `,
  styles: [],
})
export class InfiniteListComponent {
  constructor(private http: HttpService) {}
  @Input() itemSize = 20;
  @Input() page = 0;
  @Input() pageSize = 20;
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport | undefined;

  selection = new SelectionModel(true);
  list: any[] = [];
  total = 0;
  isLoading = false;

  ngAfterViewInit() {
    this.fetchMore();
    this.scroller
      ?.elementScrolled()
      .pipe(
        map(() => this.scroller?.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1 = 0, y2 = 0]) => y2 < y1 && y2 < 140),
        throttleTime(200),
      )
      .subscribe(() => {
        if (this.hasMore()) {
          this.fetchMore();
        }
      });
  }

  hasMore() {
    return this.list.length < this.total;
  }

  fetchMore() {
    this.http
      .request<{ list: any[]; total: number }>({
        method: 'get',
        url: '/api/roles',
        params: { $page: this.page + 1, $pageSize: this.pageSize },
      })
      .pipe(
        map((res) => {
          this.isLoading = true;
          return res;
        }),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe(({ list, total }) => {
        this.list = [...this.list, ...list];
        this.total = total;
        this.page = this.page + 1;
      });
  }
}
