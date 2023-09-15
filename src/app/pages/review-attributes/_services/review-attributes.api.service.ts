import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';
import { environment } from '../../../_environments/environment';



@Injectable({
    providedIn: 'root'
})
export class ReviewAttributesApiService {

    constructor(private _apiService: JWTApiService,
        private _authService: AuthService
        ) {

    }

    getPhrase() {
        const url = environment.apiUrl + '/api/review';
        const rtn = new Promise(
            (resolve, reject) => {
                this._apiService.get(url).subscribe(
                    (_data) => {
                        console.log('get phrase operation completed!');
                        console.log(_data);

                        resolve(_data);         
                    }, (err) => {
                        resolve(err.error);
                    });
            });

        return rtn;
    }

    saveRA(data) {
        const url = environment.apiUrl + '/api/reviewer-decision';
        return new Promise(
            (resolve, reject) => {
                this._apiService.post(url, data).subscribe(
                    (data) => {
                        console.log('save reviewer-decision ' + data['reviewId'] + ' was successful --> ' +data);

                        resolve({"successful": data});
                    }, (err) => {
                        reject(err);
                    });
            });
    }


}

