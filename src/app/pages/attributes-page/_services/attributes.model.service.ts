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

    save(phrase) {
        const self = this;
        return new Promise((resolve, reject) => {
            this._attributesApiService.save(phrase).then((rtn) => {
                    console.log("Call to attributeApiService was successfull");

                    resolve({ "successful": rtn });
                (err) => {
                    reject(err);
                }
            });
                // if (model["isImageChanged"]) {
                    

                //         self._pictureService.save(this._constants.PHOTO_TYPE_PROFILE, model).then((data) => {
                //             console.log("changed image for " + model['id'] + " successfully saved on server.")
                //             model["isImageChanged"] = false;
                //             resolve(rtn);
                //         }, (err) => {
                //             console.log("Error with saving picture in call to pictureService!")
                //             reject(err);
                //         })
                // } else {
                //     resolve(rtn);
                // }
            //})
        });
    }
}