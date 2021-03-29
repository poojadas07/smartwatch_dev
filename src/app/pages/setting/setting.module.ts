import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingRoutingModule} from './setting-routing.module';
import {SettingComponent} from './setting.component';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';


@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    NzDescriptionsModule,
    NzAvatarModule
  ]
})
export class SettingModule {
}
