import { Injectable } from '@angular/core';
import { PermissionsApiService } from './permissions.api.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsModelService{
  
  model: any = {};


  constructor(private _permissionsApiService: PermissionsApiService) {}


    init() {
    return new Promise((resolve, reject) => {
        this._permissionsApiService.getListOfAllUsers().then((response1) => {
          this.model['listOfUsers'] = response1;
          this._permissionsApiService.getListOfRoles().then((response2) => {
            this.model['listOfUserRoles'] = response2;
            resolve(response2);
          })    
          resolve(response1);
        })

        console.log(this.model);
        
    })

  }
  
  getListOfUsers() {
    return this.model['listOfUsers'];
  }

  getListOfRoles() {
    return this.model['listOfUserRoles'];
  }

  getAssignedRoles() {
    return this.model['listOfUsers'];
  }

}
