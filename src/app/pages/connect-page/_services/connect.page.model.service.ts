import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';

import { ConnectPageApiService } from "./connect.page.api.service";

import { Constants } from "../../../_constants/constants";

@Injectable({
    providedIn: 'root'
})
export class ConnectPageModelService {

    model: any = {};

    constructor(private _apiService: JWTApiService,
                private _authService: AuthService,
                private _ConnectPageApiService: ConnectPageApiService,
                private _constants: Constants) {

    }

    init() {
        return new Promise((resolve, reject) => {
            this._ConnectPageApiService.getListOfConnectionsByUser().then(
                (rtn) => {
                    this.model = rtn;
                    resolve(rtn);
                }
            )
        })
    }


    get() {
        return this.model;
    }

    save(model: {}) {
        return new Promise((resolve, reject) => {
            this._ConnectPageApiService.save(model).then(
                (isPhraseReviewed: boolean) => {
                    console.log("Call to ConnectPageApiService was successful");
                    resolve(isPhraseReviewed);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    } 
    
    delete(id: string): Promise<any> {
        return this._ConnectPageApiService.delete(id);
    }
}
