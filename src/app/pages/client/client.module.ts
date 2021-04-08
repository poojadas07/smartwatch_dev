import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientAddComponent } from './client-add/client-add.component';
import { ClientComponent } from './client.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [ClientAddComponent , ClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ],
  entryComponents: [ClientAddComponent]
})
export class ClientModule { }
