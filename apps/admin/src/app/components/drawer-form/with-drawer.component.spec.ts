import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithDrawerComponent } from './with-drawer.component';

describe('DrawerFormComponent', () => {
  let component: WithDrawerComponent;
  let fixture: ComponentFixture<WithDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WithDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WithDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
