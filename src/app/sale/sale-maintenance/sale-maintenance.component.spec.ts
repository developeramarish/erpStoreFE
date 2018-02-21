import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleMaintenanceComponent } from './sale-maintenance.component';

describe('SaleMaintenanceComponent', () => {
  let component: SaleMaintenanceComponent;
  let fixture: ComponentFixture<SaleMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
