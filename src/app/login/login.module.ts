import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { SavvatoJavascriptServicesModule } from "@savvato-software/savvato-javascript-services";

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
      SavvatoJavascriptServicesModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
