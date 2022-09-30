import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile.page-routing.module';

import { ProfilePage } from './profile.page';
import { EditProfilePage } from "./edit/edit";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfilePageRoutingModule
  ],
  declarations: [
    ProfilePage,
      EditProfilePage
  ]
})
export class ProfilePageModule {}
