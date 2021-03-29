import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BarChartsComponent} from './bar-charts.component';

const routes: Routes = [{path: '', component: BarChartsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarChartsRoutingModule { }
