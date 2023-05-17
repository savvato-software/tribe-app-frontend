import { Injectable } from '@angular/core';
import { AuthService } from '@savvato-software/savvato-javascript-services';
import { PermissionsApiService } from './permissions.api.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsModelService{
  
  userModel: any = {};
  
  roleModel: any = {};

  currentUserModel: any = {};


  constructor(private _authService: AuthService,
    private _permissionsApiService: PermissionsApiService) {}

    initUser() {
      this.currentUserModel = this._authService.getUser();
  
    }

    init() {
    return new Promise((resolve, reject) => {
        this._permissionsApiService.getListOfAllUsers().then((response) => {
          this.userModel['listOfUsers'] = response;
          
          resolve(response);
        })
        
    })

  }

  initRoles() {
    return new Promise((resolve, reject) => {
      this._permissionsApiService.getListOfRoles().then((response) => {
        this.roleModel['listOfUserRoles'] = response;
        
        resolve(response);
      })  
    })
  }

  getCurrentName() {
    return this.currentUserModel && this.currentUserModel['name'];
  }
  
  getListOfUsers() {
    return this.userModel && this.userModel['listOfUsers'];
  }

  getListOfRoles() {
    return this.roleModel && this.roleModel['listOfUserRoles'];
  }

}
