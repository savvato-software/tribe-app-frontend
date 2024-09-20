import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';
import {Attribute} from '../../../_type/attribute.type'

import { environment } from '../../../_environments/environment';
import {GenericResponse} from "../../_types/generic-response.type";

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


    save(model:Attribute) {
        const url = environment.apiUrl + '/api/attributes';
        let data = {
            'adverb': model['inputAdverbText'],
            'verb': model['inputVerbText'],
            'preposition': model['inputPrepositionText'],
            'noun': model['inputNounText']
        };

        return new Promise((resolve, reject) => {
            this._apiService.post(url, data).subscribe(
                (response: GenericResponse) => {
                    resolve(response.booleanMessage);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }
    saveAttributeSequences(data: {phrases: {sequence: number, phraseId: number}[]}) {
        const url = environment.apiUrl + '/api/attributes/update';
         console.log(data);

        return new Promise((resolve, reject) => {
            this._apiService.post(url, data).subscribe(
                (response: boolean) => {
                    resolve(response);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }


    delete(id: number): Promise<any> {
        const url = environment.apiUrl + '/api/attributes/?phraseId=' + id + '&userId=' + this._authService.getUser().id;

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
