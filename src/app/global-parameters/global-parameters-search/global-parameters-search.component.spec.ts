import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalParametersSearchComponent } from './global-parameters-search.component';

describe('GlobalParametersSearchComponent', () => {
  let component: GlobalParametersSearchComponent;
  let fixture: ComponentFixture<GlobalParametersSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalParametersSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalParametersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
