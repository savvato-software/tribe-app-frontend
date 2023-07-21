import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermissionsPageRoutingModule } from './permissions.page-routing.module';

import { PermissionsPage } from './permissions.page';
import { SharedComponentsModule } from '../../_shared-components/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermissionsPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [PermissionsPage]
})
export class PermissionsPageModule {}
