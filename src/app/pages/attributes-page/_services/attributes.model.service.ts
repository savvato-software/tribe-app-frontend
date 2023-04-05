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

    async getAttributesByUser() {
        const self = this;
        return new Promise((resolve, reject) => {
            this._attributesApiService.getAttributesByUser().then(
                (rtn) => {
                    resolve(rtn);
                }
            )
        })
    }

    save(model: {}) {
        const self = this;
        return new Promise((resolve, reject) => {
            this._attributesApiService.save(model).then(
                (rtn) => {
                    console.log("Call to attributeApiService was successful");
                    resolve({"successful": rtn});
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }
}
