import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptNewConnectionPageRoutingModule } from './accept-new-connection-routing.module';
import { SharedComponentsModule } from '../../../_shared-components/shared-components/shared-components.module';
import { AcceptNewConnectionPage } from './accept-new-connection.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    AcceptNewConnectionPageRoutingModule,
    QRCodeModule
  ],
  declarations: [
    AcceptNewConnectionPage
  ]
})
export class AcceptNewConnectionPageModule {}
