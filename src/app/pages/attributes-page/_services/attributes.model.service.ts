import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';

import { AttributesApiService } from "./attributes.api.service";

import { Constants } from "../../../_constants/constants";

@Injectable({
    providedIn: 'root'
})
export class AttributesModelService {

    model: any = {};

    constructor(private _apiService: JWTApiService,
                private _authService: AuthService,
                private _attributesApiService: AttributesApiService,
                private _constants: Constants) {

    }

    init() {
        return new Promise((resolve, reject) => {
            this._attributesApiService.getAttributesByUser().then(
                (rtn) => {
                    this.model = rtn;
                    resolve(rtn);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }


    get() {
        return this.model;
    }

    save(model: {}) {
        return new Promise((resolve, reject) => {
            this._attributesApiService.save(model).then(
                (rtn) => {
                    console.log("Call to attributeApiService was successful");
                    resolve(true); //Resolve with true for success
                },
                (err) => {
                    console.error("Call to attributeApiService failed:", err);
                    resolve(false); //Resolve with false for failure    
                }
            );
        });
    }
}
