import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';

import { AppComponent } from './app.component';
import { TransportComponent } from './transports/transport.component';
import { TransportService } from '../services/transport.service';
import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TransportComponent
  ],
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      [
        { path: "", component: AppComponent}
      ])
    
  ],
  providers: [TransportService
              , AppComponent
              , {provide: APP_BASE_HREF, useValue : '/' }
            ],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor() {
  }
  // ngDoBootstrap() { }
  ngDoBootstrap(appRef: ApplicationRef) {
    const rootElements = document.querySelectorAll('app-root');
    for (const element of rootElements as any as HTMLElement[]) {
      appRef.bootstrap(AppComponent, element);
    }
  }
}
