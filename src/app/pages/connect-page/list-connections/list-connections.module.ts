import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListConnectionsPageRoutingModule } from './list-connections-routing.module';

import { ListConnectionsPage } from './list-connections.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListConnectionsPageRoutingModule
  ],
  declarations: [ListConnectionsPage]
})
export class ListConnectionsPageModule {}
