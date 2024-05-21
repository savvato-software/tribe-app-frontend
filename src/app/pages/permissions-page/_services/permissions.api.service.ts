import { Injectable } from '@angular/core';
import { JWTApiService } from '@savvato-software/savvato-javascript-services';
import { environment } from '../../../_environments/environment';
import { reject, resolve } from 'cypress/types/bluebird';
import { PermissionsModelService } from './permissions.model.service';

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

  save2(changes) {

    const url = environment.apiUrl + '/api/permissions';
      let testChanges = {id:3, permissions:['ADMIN','PHRASE_REVIEWER']}
      return new Promise(
        (resolve, reject) => {
          this._apiService.post(url, testChanges).subscribe(
            (_data) => {
              resolve({ "successful": {status: true} });
              resolve({ "successful": _data });
            }, (err) => {
              reject(err);
            });
        });
        
      
    

  }

  save(changes) {

    const url = environment.apiUrl + '/api/permissions';
    
      return new Promise(
        (resolve, reject) => {
          this._apiService.post(url, changes).subscribe(
            (_data) => {
              resolve({ "successful": {status: true} });
              resolve({ "successful": _data });
            }, (err) => {
              reject(err);
            });
        });
        
      
    

  }

}



