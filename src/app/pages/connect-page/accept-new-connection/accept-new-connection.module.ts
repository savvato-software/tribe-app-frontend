import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptNewConnectionPageRoutingModule } from './accept-new-connection-routing.module';

import { AcceptNewConnectionPage } from './accept-new-connection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceptNewConnectionPageRoutingModule
  ],
  declarations: [AcceptNewConnectionPage]
})
export class AcceptNewConnectionPageModule {}
