import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';

import { environment } from '../../../_environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AttributesApiService {

    constructor(private _apiService: JWTApiService,
                private _authService: AuthService) {

    }
}