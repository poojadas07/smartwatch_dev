import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GaugeCarChartsRoutingModule} from './gauge-car-charts-routing.module';
import {GaugeCarChartsComponent} from './gauge-car-charts.component';
import {NgxEchartsModule} from 'ngx-echarts';


@NgModule({
  declarations: [GaugeCarChartsComponent],
  imports: [
    CommonModule,
    GaugeCarChartsRoutingModule,
    NgxEchartsModule
  ]
})
export class GaugeCarChartsModule {
}
