import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../_environments/environment';
import { HttpClient } from '@angular/common/http';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';

@Injectable({
    providedIn: 'root'
})

export class NotificationApiService {

    constructor(private _apiService: JWTApiService,
                private _authService:AuthService) {}

    async getAllNotificationsForUsers() {
        const url = environment.apiUrl + '/api/notifications/user/' + this._authService.getUser().id;
    
        try {
            const data = await this._apiService.get(url).toPromise();
            return data;
        } catch (error) {
            throw error;
        }
    }
    async readNotification(notificationId: number) {
        const url = environment.apiUrl + '/api/notifications/';
        console.log("api service started")
        try{
            let data = {"id" : notificationId}
            const call = await this._apiService.put(url, data).toPromise();
            console.log(data)
            console.log("sending data")
            return call;
            
        } catch (error) {
            throw error;
        }
    }
    
    async deleteMessage(notificationId: number) {
        const url = environment.apiUrl + '/api/notifications/' + notificationId;
        console.log(url);
    
        try {
            let data = { "deleting": notificationId };
            const response = await this._apiService.delete(url, data).toPromise();
            console.log(response);
            console.log("Deleted successfully");
            return response;

        } catch (error) {
            throw error;
        }
    }
}
