import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GaugeChartsRoutingModule} from './gauge-charts-routing.module';
import {GaugeChartsComponent} from './gauge-charts.component';
import {NgxEchartsModule} from 'ngx-echarts';


@NgModule({
  declarations: [GaugeChartsComponent],
  imports: [
    CommonModule,
    GaugeChartsRoutingModule,
    NgxEchartsModule
  ]
})
export class GaugeChartsModule {
}
