import { Injectable } from '@angular/core';
import { JWTApiService } from '@savvato-software/savvato-javascript-services';
import { environment } from '../../../_environments/environment';
import { reject, resolve } from 'cypress/types/bluebird';
import { PermissionsModelService } from './permissions.model.service';
import {GenericResponse} from "../../_types/generic-response.type";

@Injectable({
  providedIn: 'root'
})
export class PermissionsApiService {

  constructor(private _apiService: JWTApiService) {

}



  getListOfRoles() {
    const url = environment.apiUrl + '/api/permissions/user-roles-list';

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
    const url = environment.apiUrl + '/api/permissions/users';

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

  save(changes) {



    const url = environment.apiUrl + '/api/permissions';

      return new Promise(
        (resolve, reject) => {
          this._apiService.post(url, changes).subscribe(
            (_data: GenericResponse) => {
              resolve({ "successful": {status: true} });
              resolve({ "successful": _data });
            }, (err) => {
              reject(err);
            });
        });




  }

}



