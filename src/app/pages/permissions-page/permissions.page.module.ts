import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermissionsPageRoutingModule } from './permissions.page-routing.module';

import { PermissionsPage } from './permissions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermissionsPageRoutingModule
  ],
  declarations: [PermissionsPage]
})
export class PermissionsPageModule {}
