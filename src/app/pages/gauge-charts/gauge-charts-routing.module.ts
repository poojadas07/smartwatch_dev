import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GaugeChartsComponent} from './gauge-charts.component';

const routes: Routes = [{path: '', component: GaugeChartsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GaugeChartsRoutingModule {
}
