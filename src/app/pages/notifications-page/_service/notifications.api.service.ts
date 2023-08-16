import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../_environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {


    constructor(private http: HttpClient) {}

    getMessages(userId: any): Observable<any[]> {
        const apiNotificationUrl = `${environment.apiUrl}/api/notifications/user/${userId}`;
        console.log(`checking ${apiNotificationUrl} for notifications`);
        return this.http.get<any[]>(apiNotificationUrl);
    }

    // deleteMessage(id: number): Observable<any> {}
    }
