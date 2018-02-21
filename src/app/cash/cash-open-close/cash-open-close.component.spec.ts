import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashOpenCloseComponent } from './cash-open-close.component';

describe('CashOpenCloseComponent', () => {
  let component: CashOpenCloseComponent;
  let fixture: ComponentFixture<CashOpenCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashOpenCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashOpenCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
