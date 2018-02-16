import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierMaintenanceComponent } from './supplier-maintenance.component';

describe('SupplierMaintenanceComponent', () => {
  let component: SupplierMaintenanceComponent;
  let fixture: ComponentFixture<SupplierMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
