import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';

import { ConnectApiService } from "./connect.api.service";

import { Constants } from "../../../_constants/constants";

@Injectable({
    providedIn: 'root'
})
export class ConnectModelService {

    model :any[] = [];

    constructor(private _apiService: JWTApiService,
                private _authService: AuthService,
                private _connectApiService: ConnectApiService,
                private _constants: Constants) {

    }

    init() {
      return new Promise((resolve, reject) => {
            this._connectApiService.getAllConnections(this._authService.getUser()['id']).then(
                (rtn: any[]) => {
                    this.model = rtn;
                    resolve(rtn);
                }
            )
        })
    }

    fetchQRCodeData() {
        return  this._connectApiService.getQRCodeData();
    }

    getAllConnections() :any[] {
      return this.model;
    }

    removeConnection(connectedWithUserId: number) {
        return new Promise((resolve, reject) => {
            this._connectApiService.removeConnection(this._authService.getUser()['id'], connectedWithUserId).then(
                (rtn) => {
                    this.init();
                    resolve(rtn);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }
}
