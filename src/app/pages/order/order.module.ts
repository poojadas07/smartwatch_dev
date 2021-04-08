import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderRoutingModule} from './order-routing.module';
import {OrderComponent} from './order.component';
import {SharedModule} from '../../shared/shared.module';
import {OrderViewComponent} from './order-view/order-view.component';
import {OrderEditComponent} from './order-edit/order-edit.component';


@NgModule({
  declarations: [OrderComponent, OrderViewComponent, OrderEditComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ],
  entryComponents: [OrderViewComponent, OrderEditComponent]
})
export class OrderModule {
}
