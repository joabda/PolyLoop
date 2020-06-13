import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperloopComponent } from './hyperloop.component';

describe('HyperloopComponent', () => {
  let component: HyperloopComponent;
  let fixture: ComponentFixture<HyperloopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyperloopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyperloopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
