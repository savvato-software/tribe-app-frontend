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
    

    // deleteMessage(id: number): Observable<any> {}
}
