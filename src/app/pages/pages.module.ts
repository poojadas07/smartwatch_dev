import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SharedModule} from '../shared/shared.module';
import {HeaderModule} from '../components/header/header.module';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [PagesComponent, NotFoundComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    HeaderModule,
    TranslateModule
  ]
})
export class PagesModule {
}
