import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientscreenRoutingModule } from './clientscreen-routing.module';
import { ClientscreenComponent } from './clientscreen.component';

import { ClientscreenAddComponent } from './clientscreen-add/clientscreen-add.component';
import {SharedModule} from '../../shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [ClientscreenComponent, ClientscreenAddComponent],
  imports: [
  CommonModule,
    ClientscreenRoutingModule,
    SharedModule,
    MatGridListModule
  ],
  entryComponents: [ClientscreenAddComponent]
})
export class ClientscreenModule { }

