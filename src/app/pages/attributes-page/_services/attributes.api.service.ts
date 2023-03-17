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

    save(model) {
        const url = environment.apiUrl + '/api/attributes';
        let data = { 'adverb': model['inputAdverbTxt'], 'verb': model['inputVerbTxt'], 'preposition': model['inputPrepositionTxt'], 'noun': model['inputNounTxt'] };

        return new Promise(
            (resolve, reject) => {
                // this._apiService.post(url, data).subscribe(
                //     (_data) => {
                //         console.log('save attribute to server' + ' was successful --> ' + _data);
                        resolve({ "successful": {status: true} });
                        // resolve({ "successful": _data });
                //     }, (err) => {
                //         reject(err);
                //     });
            });
    }
}