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

                console.log("getListOfRoles API call succeeded.", _data)
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

                console.log("getListOfAllUsers API call succeeded.", _data)
                resolve(_data);
            }, (err) => {
                reject(err);
            });
    });

    return rtn;
  }

}


