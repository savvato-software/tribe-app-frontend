import { Component, OnInit } from '@angular/core';
import { NotificationService } from './_service/notifications.api.service';
import { Observable } from 'rxjs';
import { AuthService } from '@savvato-software/savvato-javascript-services';


@Component({
  selector: 'page-notification',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class NotificationPage implements OnInit {
notifications$: Observable<any[]>;

constructor(private notificationService: NotificationService,
            private _authService:AuthService) {}

  ngOnInit() {
    //Fake user ID where to get real id <<<<<<<<<<<
    const userId = this.getUserId;
    // Call the getMessages() method of the notification service to load all notifications
    this.notifications$ = this.notificationService.getMessages(userId);
    }
  
  getIcon(notification$: any): string {
    const icon = notification$.iconUrl;
    return icon ? icon : '';
  }

  getUserId() {
    return this._authService.getUser().id;
  }

  //    onDeleteNotification(id: number) {                                                    <<<<<<<<<<<<<<< Need to send ID with notification?? <<<<<<<<<<<<<<<<
    // Call the deleteMessage() method of the notification service to delete a notification
  //  this.notificationService.deleteMessage(id).subscribe(() => {
      // Remove the deleted notification from the local array of notifications
  //    this.notifications = this.notifications.filter(notification => notification.id !== id);
  //  });
  //    }

  onShowMoreInfo(notification$: any) {
    console.log('More information: ', notification$);
