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
  const url = environment.apiUrl + '/user-roles-list';

  const rtn = new Promise(
    (resolve, reject) => {
        this._apiService.get(url).subscribe(
            (_data) => {

                resolve(_data);
            }, (err) => {
                reject(err);
            });
    });

return rtn;
}

getListOfAllUsers() {
  const url = environment.apiUrl + '/users';

  const rtn = new Promise(
    (resolve, reject) => {
        this._apiService.get(url).subscribe(
            (_data) => {

                resolve(_data);
            }, (err) => {
                reject(err);
            });
    });

    return rtn;
  }

}


