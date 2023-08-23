import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';

import { NotificationApiService } from './notifications.api.service';
import { Constants } from "../../../_constants/constants";

@Injectable({
    providedIn: 'root'
})
export class NotificationModelService {

    constructor(private _notificationService: NotificationApiService) {}

    async getAllNotificationsForUsers() {
        const self = this;
        return new Promise((resolve, reject) => {
            this._notificationService.getAllNotificationsForUsers().then(
                (rtn) => {
                    resolve(rtn);
                }
            )
        })
    }

}
