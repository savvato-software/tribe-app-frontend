import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttributesPageRoutingModule } from './attributes-routing.module';

import { AttributesPage } from './attributes.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttributesPageRoutingModule
  ],
  declarations: [AttributesPage]
})
export class AttributesPageModule {}
