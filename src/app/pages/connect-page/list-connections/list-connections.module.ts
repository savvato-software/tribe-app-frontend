import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ConnectionDetailsPage } from '../connection-details/connection-details.page';
import { ListConnectionsPageRoutingModule } from './list-connections-routing.module';

import { ListConnectionsPage } from './list-connections.page';
import { SharedComponentsModule } from '../../../_shared-components/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListConnectionsPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [ListConnectionsPage, ConnectionDetailsPage]
})
export class ListConnectionsPageModule {}
