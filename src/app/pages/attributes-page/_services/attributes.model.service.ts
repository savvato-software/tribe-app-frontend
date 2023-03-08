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
}