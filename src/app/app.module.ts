import { NgModule } from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {Constants} from "./_constants/constants";
import {HttpConfigInterceptor} from "./_services/_http/interceptor.service";

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    'press': { time: 700 }  //set press delay for .70 seconds
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true,
  },
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    { provide: HAMMER_GESTURE_CONFIG,    useClass: CustomHammerConfig },
    Constants
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
