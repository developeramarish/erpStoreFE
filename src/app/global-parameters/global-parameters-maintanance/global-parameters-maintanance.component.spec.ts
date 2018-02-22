import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalParametersMaintananceComponent } from './global-parameters-maintanance.component';

describe('GlobalParametersMaintananceComponent', () => {
  let component: GlobalParametersMaintananceComponent;
  let fixture: ComponentFixture<GlobalParametersMaintananceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalParametersMaintananceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalParametersMaintananceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
