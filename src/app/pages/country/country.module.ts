import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CountryRoutingModule} from './country-routing.module';
import {CountryComponent} from './country.component';
import {CountryAddComponent} from './country-add/country-add.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [CountryComponent, CountryAddComponent],
  imports: [
    CommonModule,
    CountryRoutingModule,
    SharedModule
  ],
  entryComponents: [CountryAddComponent]
})
export class CountryModule {
}
