import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashSearchComponent } from './cash-search.component';

describe('CashSearchComponent', () => {
  let component: CashSearchComponent;
  let fixture: ComponentFixture<CashSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
