import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';

import { NotificationApiService } from './notifications.api.service';
import { Constants } from "../../../_constants/constants";

@Injectable({
    providedIn: 'root'
  })
  export class NotificationModelService {
    notifications: any = [];
  
    constructor(private _notificationApiService: NotificationApiService) {}
  
    async init() {
      this.notifications = await this._notificationApiService.getAllNotificationsForUsers();
      console.log('Retrieved data:', this.notifications);
    }
  
    getNotifications() {
      return this.notifications;
    }
  
  }
  