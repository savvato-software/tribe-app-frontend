import { Injectable } from '@angular/core';
import { JWTApiService } from '@savvato-software/savvato-javascript-services';

import { environment } from '../../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionsApiService {

  constructor(private _apiService: JWTApiService) {

}

getListOfRoles() {
  const url = environment.apiUrl + '/api/permissions/user-roles/';

  const rtn = new Promise(
    (resolve, reject) => {
        this._apiService.get(url).subscribe(
            (_data) => {
                //console.log('Roles acquired');
                //console.log(_data);

                resolve(_data);
            }, (err) => {
                reject(err);
            });
    });

return rtn;
}

getListOfAllUsers() {
  const url = environment.apiUrl + '/api/permissions/users/';

  const rtn = new Promise(
    (resolve, reject) => {
        this._apiService.get(url).subscribe(
            (_data) => {
                //console.log('All users acquired');
                //console.log(_data);

                resolve(_data);
            }, (err) => {
                reject(err);
            });
    });

    return rtn;
  }

}


