import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeChartsComponent } from './gauge-charts.component';

describe('GaugeChartsComponent', () => {
  let component: GaugeChartsComponent;
  let fixture: ComponentFixture<GaugeChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaugeChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugeChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
