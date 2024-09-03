import { Injectable } from '@angular/core';
import { JWTApiService } from '@savvato-software/savvato-javascript-services';
import { environment } from '../../../_environments/environment';
import { reject, resolve } from 'cypress/types/bluebird';
import { PermissionsModelService } from './permissions.model.service';
import { UserRole } from '../_types/user-role.type';
import { User } from '../_types/user.type';

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
            (_data: UserRole[]) => { 
                resolve(_data);
            }, (err) => {
                reject(err);
            });
    });

    return rtn;
  }

  getListOfRolesTest() {
    return  ["one","two","three"];
  }

  testOfTest(){
    return false;
  }

  getListOfAllUsers() {
    const url = environment.apiUrl + '/api/permissions/users';

    const rtn = new Promise(
      (resolve, reject) => {
          this._apiService.get(url).subscribe(
              (_data: User[]) => {

                resolve(_data);
            }, (err) => {
                reject(err);
            });
    });

    return rtn;
  }


  save(roles) {

    const url = environment.apiUrl + '/api/permissions';
    
    return new Promise(
      (resolve, reject) => {
        this._apiService.post(url, roles).subscribe(
          (_data) => {
            console.log("api level success ");
            resolve({ "successful": _data });
          }, (err) => {
            console.log("api level error ",err);
            reject(err);
          }
        );
      }
    );
  }
}



