import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';

import { environment } from '../../../_environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProfileApiService {

    constructor(private _apiService: JWTApiService,
                private _authService: AuthService) {

    }

    getById(id) {
        const url = environment.apiUrl + '/api/profile/' + id;

        const rtn = new Promise(
            (resolve, reject) => {
                this._apiService.get(url).subscribe(
                    (_data) => {
                        console.log('Read ' + id + ' Profile operation completed!');
                        console.log(_data);

                        resolve(_data);
                    }, (err) => {
                        reject(err);
                    });
            });

        return rtn;
    }

    save(model) {
        const url = environment.apiUrl + '/api/profile/' + model['userId'];
        let data = {'id': model['userId'], 'name': model['name'], 'email': model['email'], 'phone': model['phone']};

        return new Promise(
            (resolve, reject) => {
                this._apiService.put(url, data).subscribe(
                    (_data) => {
                        console.log('save profile ' + model['id'] + ' was successful --> ' +_data);

                        resolve({"successful": _data});
                    }, (err) => {
                        reject(err);
                    });
            });
    }
}
