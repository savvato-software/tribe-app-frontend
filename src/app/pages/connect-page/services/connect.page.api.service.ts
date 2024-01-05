import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';

import { environment } from '../../../_environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConnectPageApiService {

    constructor(private _apiService: JWTApiService,
                private _authService: AuthService) {

    }

    getAttributesByUser() {
        const url = environment.apiUrl + '/api/connect/' + this._authService.getUser().id;

        return new Promise((resolve, reject) => {
            this._apiService.get(url).subscribe(
                (_data) => {
                    resolve(_data);
                }
            )
        })
    }

    save(model) {
        const url = environment.apiUrl + '/api/connect/';
        let data = {
            'adverb': model['inputAdverbText'],
            'verb': model['inputVerbText'],
            'preposition': model['inputPrepositionText'],
            'noun': model['inputNounText']
        };
    
        return new Promise((resolve, reject) => {
            this._apiService.post(url, data).subscribe(
                (response: any) => {
                    const isPhraseReviewed = response;
    
                    resolve(isPhraseReviewed);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }

    delete(id: string): Promise<any> {
        const url = environment.apiUrl + '/api/connect/?phraseId=' + id + '&userId=' + this._authService.getUser().id;
    
        return new Promise((resolve, reject) => {
            this._apiService.delete(url, {}).subscribe(
                (response: any) => {
                    console.log("Call to attributeApiService was successful");
                    resolve(response);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }
    
}
