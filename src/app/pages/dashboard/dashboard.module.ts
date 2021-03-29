import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashboardAddComponent } from './dashboard-add/dashboard-add.component';


@NgModule({
  declarations: [DashboardComponent, DashboardAddComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgxChartsModule,
    MatGridListModule,
  ],
  entryComponents: [DashboardAddComponent]
})
export class DashboardModule {
}
