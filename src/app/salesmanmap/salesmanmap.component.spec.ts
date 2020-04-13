import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanmapComponent } from './salesmanmap.component';

describe('SalesmanmapComponent', () => {
  let component: SalesmanmapComponent;
  let fixture: ComponentFixture<SalesmanmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesmanmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesmanmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
