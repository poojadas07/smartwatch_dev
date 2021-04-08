import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PieChartsRoutingModule} from './pie-charts-routing.module';
import {PieChartsComponent} from './pie-charts.component';
import {NgxEchartsModule} from 'ngx-echarts';


@NgModule({
  declarations: [PieChartsComponent],
  imports: [
    CommonModule,
    PieChartsRoutingModule,
    NgxEchartsModule
  ]
})
export class PieChartsModule {
}
