import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryMaintenanceComponent } from './entry-maintenance.component';

describe('EntryMaintenanceComponent', () => {
  let component: EntryMaintenanceComponent;
  let fixture: ComponentFixture<EntryMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
