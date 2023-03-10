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

    save(phrase) {
        const url = environment.apiUrl + '/api/attributes';
        let data = { 'adverb': phrase['inputAdverbTxt'], 'verb': phrase['inputVerbTxt'], 'preposition': phrase['inputPrepositionTxt'], 'noun': phrase['inputNounTxt'] };

        return new Promise(
            (resolve, reject) => {
                /** Taken from tribe-app-frontend/blob/develop/src/app/pages/profile-page/_services/profile.api.service.ts
                         * this calls _apiService.put(url, data) in my case i'm calling post() from
                         *  savvato-javascript-services/blob/master/projects/savvato-javascript-services/src/lib/_services/api/api.service.ts 
                         * in both methods there's this line
                         *          if (!data['userId'])
                                        data['userId'] = this._authService.getUser()['id'];
                
                                    return this._http.post(url, data, { headers: httpHeaders });
                         * Is this data['userId'] looking to see if my data has a userId field defined? If so does that mean I have to include a 'id': phrase['id'] in my data? 
                            If so where does this 'id' come from in attributes? I can take the profile id but, that means that a user can only have one attribute.
                            POSSIBLE PATH
                                this._authService.getUser()['id'] // Taken from /pages/profile-page/edit/edit.ts/ionViewWillEnter()
                */
                this._apiService.post(url, data).subscribe( //Confirm: Is this what's saving the atrribute to the user?
                    (_data) => {
                        console.log('save attribute to server' + ' was successful --> ' + _data);

                        resolve({ "successful": _data });
                    }, (err) => {
                        reject(err);
                    });

                /*Taken from tribe-app-frontend/blob/develop/src/app/_services/picture/picture.service.ts
                self._apiService.post(url, data)
                    .subscribe(res => {
                      if (res['msg'] === 'ok') {
                        resolve(true);
                      } else {
                        reject("error saving attribute to server");
                      }
                    });*/
            });
    }
}