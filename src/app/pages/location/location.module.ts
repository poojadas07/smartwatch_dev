import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { LocationAddComponent } from './location-add/location-add.component';
import {LocationComponent} from './location.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [LocationComponent , LocationAddComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
    SharedModule
  ],
  entryComponents: [LocationAddComponent]
})
export class LocationModule { }
