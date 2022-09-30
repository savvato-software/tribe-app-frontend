import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomainObjectPageRoutingModule } from './domain-object-routing.module';

import { DomainObjectPage } from './domain-object.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomainObjectPageRoutingModule
  ],
  declarations: [DomainObjectPage]
})
export class DomainObjectPageModule {}
