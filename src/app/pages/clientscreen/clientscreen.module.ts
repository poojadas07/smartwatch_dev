import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientscreenRoutingModule } from './clientscreen-routing.module';
import { ClientscreenComponent } from './clientscreen.component';
import { ClientscreenAddComponent } from './clientscreen-add/clientscreen-add.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [ClientscreenComponent, ClientscreenAddComponent],
  imports: [
  CommonModule,
    ClientscreenRoutingModule,
    SharedModule
  ],
  entryComponents: [ClientscreenAddComponent]
})
export class ClientscreenModule { }
