import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreenComponent } from './screen.component';

const routes: Routes = [{path : '' , component: ScreenComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreenRoutingModule { }
