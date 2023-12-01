import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { ChoosePhotoSourcePage } from './choose-photo-source';

@NgModule({
  imports: [
    IonicModule,
  	CommonModule,
  ]
  ,declarations: [
    ChoosePhotoSourcePage
  ]
  ,exports: [
    ChoosePhotoSourcePage
  ]
  ,providers: [

  ]
})
export class  ChoosePhotoSourceModule {}
