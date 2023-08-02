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

    getAttributesByUser() {
        const url = environment.apiUrl + '/api/attributes/' + this._authService.getUser().id;

        return new Promise((resolve, reject) => {
            this._apiService.get(url).subscribe(
                (_data) => {
                    resolve(_data);
                }
            )
        })
    }

    save(model) {
        const url = environment.apiUrl + '/api/attributes';
        let data = {
            'adverb': model['inputAdverbTxt'],
            'verb': model['inputVerbTxt'],
            'preposition': model['inputPrepositionTxt'],
            'noun': model['inputNounTxt']
        };
    
        return new Promise((resolve, reject) => {
            this._apiService.post(url, data).subscribe(
                (response: any) => {
                    const isPhraseReviewed = response.success;
    
                    resolve(isPhraseReviewed);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }
    
}
