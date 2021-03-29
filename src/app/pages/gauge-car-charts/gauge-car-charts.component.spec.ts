import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeCarChartsComponent } from './gauge-car-charts.component';

describe('GaugeCarChartsComponent', () => {
  let component: GaugeCarChartsComponent;
  let fixture: ComponentFixture<GaugeCarChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaugeCarChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeCarChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
