import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttributesPageRoutingModule } from './attributes.page-routing.module';

import { AttributesPage } from './attributes.page';
import { CreateAttributePage } from './create/create';
import { DetailAttributePage } from "./detail/detail";
import { EditAttributePage } from "./edit/edit";
import { SharedComponentsModule } from '../../_shared-components/shared-components/shared-components.module';
import { SequenceService } from '@savvato-software/savvato-javascript-services';

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
    CreateAttributePage,
    DetailAttributePage,
    EditAttributePage
  ],
  providers: [
    SequenceService // Provide the service here
  ],
})
export class AttributesPageModule {}
