import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientscreenComponent } from './clientscreen.component';

const routes: Routes = [{path: '', component: ClientscreenComponent}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClientscreenRoutingModule { }
