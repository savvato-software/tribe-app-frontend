import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpenConnectionPageRoutingModule } from './open-connection-routing.module';

import { OpenConnectionPage } from './open-connection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpenConnectionPageRoutingModule
  ],
  declarations: [OpenConnectionPage]
})
export class OpenConnectionPageModule {}
