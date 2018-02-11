import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitMaintenanceComponent } from './unit-maintenance.component';

describe('UnitMaintenanceComponent', () => {
  let component: UnitMaintenanceComponent;
  let fixture: ComponentFixture<UnitMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
