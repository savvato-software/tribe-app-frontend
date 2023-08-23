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

    getAllNotificationsForUsers() {
        
        const url = environment.apiUrl + '/api/notifications/user/' + this._authService.getUser().id;
        
        return new Promise((resolve, reject) => {
            this._apiService.get(url).subscribe(
                (_data) => {
                    resolve(_data);
                }
            )
        })
    }

    // deleteMessage(id: number): Observable<any> {}
}

