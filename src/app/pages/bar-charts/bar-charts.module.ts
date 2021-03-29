import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BarChartsRoutingModule} from './bar-charts-routing.module';
import {BarChartsComponent} from './bar-charts.component';
import {NgxEchartsModule} from 'ngx-echarts';


@NgModule({
  declarations: [BarChartsComponent],
  imports: [
    CommonModule,
    BarChartsRoutingModule,
    NgxEchartsModule
  ]
})
export class BarChartsModule {
}
