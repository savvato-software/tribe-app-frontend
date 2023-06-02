import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewAttributesPageRoutingModule } from './review-attributes-routing.module';

import { ReviewAttributesPage } from './review-attributes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewAttributesPageRoutingModule
  ],
  declarations: [ReviewAttributesPage]
})
export class ReviewAttributesPageModule {}
