import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IconsProviderModule} from './icons-provider.module';
import {ZorroAntModule} from './shared/zorro-ant.module';
import {NZ_I18N, en_US} from 'ng-zorro-antd/i18n';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

import {DatePipe, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {environment} from '../environments/environment';
import {QuillModule} from 'ngx-quill';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {StorageModule} from '@ngx-pwa/local-storage';
import {NgxEchartsModule} from 'ngx-echarts';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {MatGridListModule} from '@angular/material/grid-list';

registerLocaleData(en);

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    ZorroAntModule,
    FormsModule,
    QuillModule.forRoot(),
    HttpClientModule,
    NgxChartsModule,
    NzGridModule,
    MatGridListModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StorageModule.forRoot({IDBNoWrap: true})
  ],
  providers: [DatePipe,
    {provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
