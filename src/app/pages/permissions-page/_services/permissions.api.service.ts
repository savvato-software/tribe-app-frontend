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

// will not accept -- private _permissionsModelService: PermissionsModelService


  getListOfRoles() {
    const url = environment.apiUrl + '/api/permissions/user-roles-list';

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
    const url = environment.apiUrl + '/api/permissions/users';

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

  save(changes) {
    
    console.log("requested data ==>  ",changes.id);
      
    const url = environment.apiUrl + '/api/permissions';
    
      return new Promise(
        (resolve, reject) => {
          this.delete(changes.id);
          this._apiService.post(url, changes).subscribe(
            (_data) => {
              console.log('roles saved to server ' + _data);
              resolve({ "successful": {status: true} });
              resolve({ "successful": _data });
            }, (err) => {
              console.log('API error');
              reject(err);
            });
        });
        
      
    

  }
 

  delete(user) {
    const url = environment.apiUrl + "/api/permissions";
    let changes = {id:user, permissions:["ROLE_ADMIN", "ROLE_PHRASEREVIEWER"]}; //{id:3, roles:["test1", "test2", "test3"]}; //
    return new Promise(
      (resolve, reject) => {
        this._apiService.delete(url, changes).subscribe(
          (_data) => {
            console.log('role(s) removed from server ' + _data);
            resolve({ "successful": {status: true} });
          }, (err) => {
            console.log('API error');
            reject(err);
          });
      });
  }

}



