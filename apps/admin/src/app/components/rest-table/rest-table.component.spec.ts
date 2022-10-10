import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestTableComponent } from './rest-table.component';

describe('RestTableComponent', () => {
  let component: RestTableComponent;
  let fixture: ComponentFixture<RestTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
