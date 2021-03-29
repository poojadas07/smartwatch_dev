import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GaugeCarChartsComponent} from './gauge-car-charts.component';

const routes: Routes = [{path: '', component: GaugeCarChartsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GaugeCarChartsRoutingModule { }
