import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SunpagePageRoutingModule } from './sunpage-routing.module';

import { SunpagePage } from './sunpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SunpagePageRoutingModule
  ],
  declarations: [SunpagePage]
})
export class SunpagePageModule {}
