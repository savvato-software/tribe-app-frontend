import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttributesPageRoutingModule } from './attributes.page-routing.module';

import { AttributesPage } from './attributes.page';
import { CreateAttributePage } from './create/create';
import { SharedComponentsModule } from '../../_shared-components/shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttributesPageRoutingModule, 
    SharedComponentsModule
  ],
  declarations: [
    AttributesPage,
    CreateAttributePage
  ]
})
export class AttributesPageModule {}
