import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashMaintenanceComponent } from './cash-maintenance.component';

describe('CashMaintenanceComponent', () => {
  let component: CashMaintenanceComponent;
  let fixture: ComponentFixture<CashMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
