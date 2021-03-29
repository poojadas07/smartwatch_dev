import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ZorroAntModule} from './zorro-ant.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ZorroAntModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ZorroAntModule
  ]
})
export class SharedModule {
}
