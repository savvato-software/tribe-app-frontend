import { Component, OnInit } from '@angular/core';
import { NotificationModelService } from './_service/notifications.model.service';


@Component({
  selector: 'page-notification',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class NotificationPage implements OnInit {
  headerPageTitle: string = 'Notifications';
  constructor(private notificationModelService: NotificationModelService) {}

  ngOnInit() {
    this.notificationModelService.init();
  }

  get notifications() {
    return this.notificationModelService.getNotifications();
  }

  onShowMoreInfo(notification: any) {
    console.log('More information:', notification.body);
  }

  getIcon(notification: any): string {
    const icon = notification.iconUrl;
    return icon ? icon : '';
  }
}
