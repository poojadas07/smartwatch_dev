import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserInfoComponent } from './user-info/user-info.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [UsersComponent, UserInfoComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  entryComponents:[UserInfoComponent]
})
export class UsersModule { }
