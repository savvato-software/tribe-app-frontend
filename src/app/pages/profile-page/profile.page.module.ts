import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile.page-routing.module';

import { ProfilePage } from './profile.page';
import { EditProfilePage } from "./edit/edit";
import { SharedComponentsModule } from '../../_shared-components/shared-components/shared-components.module';
import { ChoosePhotoSourceModule } from '../_common/choose-photo-source/choose-photo-source.module';
import { DomainObjectPageModule } from "../_common/domain-object/domain-object.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfilePageRoutingModule,
    SharedComponentsModule,
    ChoosePhotoSourceModule,
    DomainObjectPageModule
  ],
  declarations: [
    ProfilePage,
      EditProfilePage
  ]
})
export class ProfilePageModule {}
