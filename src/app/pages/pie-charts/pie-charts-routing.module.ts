import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PieChartsComponent} from './pie-charts.component';

const routes: Routes = [{path: '', component: PieChartsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PieChartsRoutingModule { }
