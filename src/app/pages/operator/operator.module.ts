import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperatorRoutingModule } from './operator-routing.module';
import { OperatorAddComponent } from './operator-add/operator-add.component';
import { OperatorComponent } from './operator.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [OperatorAddComponent , OperatorComponent],
  imports: [
    CommonModule,
    OperatorRoutingModule,
    SharedModule
  ],
  entryComponents: [OperatorAddComponent]
})
export class OperatorModule { }
