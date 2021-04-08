import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionRoutingModule } from './region-routing.module';
import { RegionAddComponent } from './region-add/region-add.component';
import {RegionComponent} from './region.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [RegionComponent,RegionAddComponent],
  imports: [
    CommonModule,
    RegionRoutingModule,
    SharedModule
  ],
  entryComponents: [RegionAddComponent]
})
export class RegionModule { }
