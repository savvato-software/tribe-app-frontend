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
                    // Assume that the response contains a property named 'success' indicating whether the phrase is reviewed (true) or in review (false).
                    // Adjust the property name as needed based on the actual response from the backend.
                    const isPhraseReviewed = response.success;
    
                    // Resolve with the boolean value indicating whether the phrase is reviewed or in review
                    resolve(isPhraseReviewed);
                },
                (err) => {
                    // Handle any errors that occurred during the API call
                    reject(err);
                }
            );
        });
    }
    
}
