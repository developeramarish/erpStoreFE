import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMaintenanceComponent } from './category-maintenance.component';

describe('CategoryMaintenanceComponent', () => {
  let component: CategoryMaintenanceComponent;
  let fixture: ComponentFixture<CategoryMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
