import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationPage } from './notifications.page';
import { IonicModule } from '@ionic/angular';
import { NotificationPageRoutingModule } from './notifications.page-routing.module';
import { LongPressDirective } from './_directives/long-press.directive'


@NgModule({
  declarations: [LongPressDirective, NotificationPage],
  imports: [
    CommonModule,
    IonicModule,
    NotificationPageRoutingModule
  ],
})
export class NotificationsPageModule { }
