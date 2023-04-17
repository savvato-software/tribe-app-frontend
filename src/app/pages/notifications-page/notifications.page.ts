import { Component, OnInit } from '@angular/core';
import { NotificationService } from './_services/notifications.api.service';

@Component({
selector: 'page-notification',
templateUrl: './notifications.page.html',
styleUrls: ['./notifications.page.scss']
})

export class NotificationPage implements OnInit{
    notifications: any[];

    constructor(private notificationService: NotificationService) {}
  
    ngOnInit() {
      // Call the getMessages() method of the notification service to load all notifications
      this.notificationService.getMessages().subscribe(notifications => {
        this.notifications = notifications;
      });
    }
  
    onDeleteNotification(id: number) {
      // Call the deleteMessage() method of the notification service to delete a notification
      this.notificationService.deleteMessage(id).subscribe(() => {
        // Remove the deleted notification from the local array of notifications
        this.notifications = this.notifications.filter(notification => notification.id !== id);
      });
    }
  }