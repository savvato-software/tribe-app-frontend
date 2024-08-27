import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';

import { environment } from '../../../_environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConnectApiService {

    constructor(private _apiService: JWTApiService,
                private _authService: AuthService) {

    }

    getQRCodeData() {
        const url = environment.apiUrl + '/api/connect/' + this._authService.getUser().id;
        return new Promise((resolve, reject) => {
            this._apiService.get(url).subscribe(
                (_data) => {
                    resolve(_data);
                },
                (err) => {
                    reject(err);
                }
            )
        })
    }

    getAllConnections(userId: number) {
        const url = environment.apiUrl + '/api/connect/' + userId + '/all';
        return new Promise((resolve, reject) => {
            this._apiService.get(url).subscribe(
                (_data) => {
                    resolve(_data);
                },
                (err) => {
                    reject(err);
                }
            )
        })
    }

    removeConnection(requestingUserId: number, connectedWithUserId: number) {
        const url = environment.apiUrl + '/api/connect/';
        const connectionRemovalRequest = {
          requestingUserId: requestingUserId,
          connectedWithUserId: connectedWithUserId
        };
        return new Promise((resolve, reject) => {
            this._apiService.delete(url, connectionRemovalRequest).subscribe(
                (_data) => {
                    resolve(_data);
                },
                (err) => {
                    reject(err);
                }
            )
        })
    }


}
