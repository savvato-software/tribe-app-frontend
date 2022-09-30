import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SavvatoJavascriptServicesModule } from '@savvato-software/savvato-javascript-services';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpConfigInterceptor } from './_services/_http/interceptor.service';

import { Constants } from './_constants/constants';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { WebView } from '@ionic-native/ionic-webview/ngx'


export class CustomHammerConfig extends HammerGestureConfig {
    overrides = {
        'press': { time: 700 }  //set press delay for .70 seconds
    }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      SavvatoJavascriptServicesModule,
      HttpClientModule,
      AppRoutingModule,
      HammerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
      { provide: HAMMER_GESTURE_CONFIG,    useClass: CustomHammerConfig },
      Constants,
      WebView
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
