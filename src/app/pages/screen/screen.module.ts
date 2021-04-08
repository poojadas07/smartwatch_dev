import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenRoutingModule } from './screen-routing.module';
import { ScreenAddComponent } from './screen-add/screen-add.component';
import { ScreenComponent } from './screen.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [ScreenAddComponent , ScreenComponent],
  imports: [
    CommonModule,
    ScreenRoutingModule,
    SharedModule
  ],
  entryComponents: [ScreenAddComponent]
})
export class ScreenModule { }
