import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentAddComponent } from './department-add/department-add.component';
import { DepartmentComponent } from './department.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [DepartmentAddComponent , DepartmentComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule
  ],
  entryComponents: [DepartmentAddComponent]
})
export class DepartmentModule { }
