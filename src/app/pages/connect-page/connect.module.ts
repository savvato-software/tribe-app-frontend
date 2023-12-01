import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectPageRoutingModule } from './connect-routing.module';

import { ConnectPage } from './connect.page';
import { ListConnectionsPageModule } from './list-connections/list-connections.module';
import { AcceptNewConnectionPageModule} from "./accept-new-connection/accept-new-connection.module";
import { OpenConnectionPageModule} from "./open-connection/open-connection.module";
import { SharedComponentsModule } from '../../_shared-components/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectPageRoutingModule,
    SharedComponentsModule,
    ListConnectionsPageModule,
    AcceptNewConnectionPageModule,
    OpenConnectionPageModule
  ],
  declarations: [ConnectPage]
})
export class ConnectPageModule {}
