import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';

import { NotificationApiService } from './notifications.api.service';
import { Constants } from "../../../_constants/constants";

@Injectable({
    providedIn: 'root'
  })

  export class NotificationModelService {
    notifications: any = [];

    setProgress() {
      this.notifications.forEach(notification => {
        notification.progress = 0;
        console.log('Notification ID:', notification.id, 'Progress set to:', notification.progress);
      });
    }
    

    constructor(private _notificationApiService: NotificationApiService) {}

    setRead(notification:any) {
      notification.isRead = true
    }
  
    async init() {
      this.notifications = await this._notificationApiService.getAllNotificationsForUsers();
      console.log('Retrieved data:', this.notifications);
      this.setProgress()
    }
  
    getNotifications() {
      return this.notifications;
    }

    async readNotification(notificationId: number){
      console.log("sending data to back server")
      this._notificationApiService.readNotification(notificationId);
    }

    async deleteNotification(notificationId: number) {
      try {
        const data = await this._notificationApiService.deleteMessage(notificationId);
        this.init();
      } catch (error) {
        console.error(error);
      }
    }
  }
  