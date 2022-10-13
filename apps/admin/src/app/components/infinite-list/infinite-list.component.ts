import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialUIModule } from '../../modules/material-ui.module';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { SelectionModel } from '@angular/cdk/collections';
import { filter, finalize, map, pairwise, throttleTime } from 'rxjs/operators';
import { HttpService } from '../../http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-infinite-list',
  standalone: true,
  imports: [CommonModule, MaterialUIModule, ScrollingModule],
  template: `
    <!--    <mat-form-field [ngStyle]="{ width: '100%' }" floatLabel="never">-->
    <!--      <mat-label>Search</mat-label>-->
    <!--      <input matInput type="text" />-->
    <!--    </mat-form-field>-->
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
        >
          <ng-container
            *ngTemplateOutlet="labelTemplate; context: { $implicit: item }"
          ></ng-container>
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
  @Input() fetch!: CallableFunction;
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport | undefined;
  @ContentChild('labelTemplate') labelTemplate!: TemplateRef<unknown>;

  selection = new SelectionModel(true);
  list: unknown[] = [];
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
    this.fetch({ $page: this.page + 1, $pageSize: this.pageSize })
      .pipe(
        map((res) => {
          this.isLoading = true;
          return res;
        }),
        finalize(() => (this.isLoading = false)),
      )
      .subscribe(({ list, total }: any) => {
        this.list = [...this.list, ...list];
        this.total = total;
        this.page = this.page + 1;
      });
  }
}
