import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientscreenRoutingModule } from './clientscreen-routing.module';
import { ClientscreenComponent } from './clientscreen.component';
import { ClientscreenaddComponent } from './clientscreenadd/clientscreenadd.component';
import {SharedModule} from '../../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [ClientscreenComponent, ClientscreenaddComponent],
  imports: [
  CommonModule,
    ClientscreenRoutingModule,
    SharedModule,
    MatGridListModule
  ],
  entryComponents: [ClientscreenaddComponent]
})
export class ClientscreenModule { }
