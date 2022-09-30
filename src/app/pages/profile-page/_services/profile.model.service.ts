import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';
import { PictureService } from "../../../_services/picture/picture.service";

import { ProfileApiService } from "./profile.api.service";

import { Constants } from "../../../_constants/constants";

@Injectable({
    providedIn: 'root'
})
export class ProfileModelService {

    model: any = {};

    constructor(private _apiService: JWTApiService,
                private _authService: AuthService,
                private _profileApiService: ProfileApiService,
                private _pictureService: PictureService,
                private _constants: Constants) {

    }

    init(id) {
        return new Promise((resolve, reject) => {
            this._profileApiService.getById(id).then((response) => {
                this.model = response;

                this.model['id'] = id;
                this.model['userId'] = id;

                this._pictureService.getAssociatedImage(this._constants.PHOTO_TYPE_PROFILE, this._authService.getUser(), this._constants.PHOTO_SIZE_THUMBNAIL).then((imageData) => {
                    this.model["imageWebPath"] = imageData['url'];
                    imageData["imgData"].subscribe( id => {
                        this.model["image"] = id;
                        resolve(response);
                    });
                })
            })
        })

    }

    get() {
        return this.model;
    }

    save(model) {
        const self = this;
        return new Promise((resolve, reject) => {
            this._profileApiService.save(model).then((rtn) => {
                if (model["isImageChanged"]) {
                    if (model["imageWebPath"]) {

                        self._pictureService.save(this._constants.PHOTO_TYPE_PROFILE, model).then((data) => {
                            console.log("changed image for " + model['id'] + " successfully saved on server.")
                            model["isImageChanged"] = false;
                            resolve(rtn);
                        }, (err) => {
                            console.log("Error with saving picture in call to pictureService!")
                            reject(err);
                        })
                    } else {

                        self._pictureService.delete(this._constants.PHOTO_TYPE_PROFILE, model).then((data) => {
                            console.log("image for " + model['id'] + " successfully deleted on server.")
                            model["isImageChanged"] = false;
                            resolve(rtn);
                        }, (err) => {
                            console.log("Error with saving picture in call to pictureService!")
                            reject(err);
                        })
                    }
                } else {
                    resolve(rtn);
                }
            })
        })
    }

    resetImageToDefault() {
    }
}
