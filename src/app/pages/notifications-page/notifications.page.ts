import { Component, OnInit } from '@angular/core';
import { NotificationModelService } from './_service/notifications.model.service';


@Component({
  selector: 'page-notification',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class NotificationPage implements OnInit {
  model: any = {};

  constructor(private NotificationModelService: NotificationModelService,) {}
    
  ngOnInit() {
      
      this.model = this.NotificationModelService.getAllNotificationsForUsers();
  }
    
  getIcon(model: any): string {
    const icon = model.iconUrl;
    return icon ? icon : '';
  }

  //onDeleteNotification(id: number) {}

  onShowMoreInfo(model: any) {
    console.log('More information: ', model.body);
  }
}
