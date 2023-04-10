import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermissionsPagePageRoutingModule } from './permissions.page-routing.module';

import { PermissionsPage } from './permissions.page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermissionsPagePageRoutingModule
  ],
  declarations: [PermissionsPage]
})
export class PermissionsPagePageModule {}
