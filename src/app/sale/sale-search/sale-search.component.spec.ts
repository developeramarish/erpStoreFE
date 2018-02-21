import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleSearchComponent } from './sale-search.component';

describe('SaleSearchComponent', () => {
  let component: SaleSearchComponent;
  let fixture: ComponentFixture<SaleSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
