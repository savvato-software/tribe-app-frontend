import { Injectable } from '@angular/core';
import { PermissionsApiService } from './permissions.api.service';
import { ModelTransformingService } from '@savvato-software/savvato-javascript-services';

@Injectable({
  providedIn: 'root'
})
export class PermissionsModelService {

  model = {};

  dirty = false;

  hasSelectedUser = false;

  selectedUserRoles = [];

  selectedUser = {};

  selectedUserName = "";

  


  constructor(
    private _modelTransformingService: ModelTransformingService,
    private _permissionsApiService: PermissionsApiService) { }

  init() {
    this._modelTransformingService.clearAllTransformers();
    this._modelTransformingService.reset();

    this._modelTransformingService.addTransformer((model, done) => {
      this._permissionsApiService.getListOfAllUsers().then((response1) => {
        model['listOfUsers'] = response1;
        done();
      })
    });

    this._modelTransformingService.addTransformer((model, done) => {
      this._permissionsApiService.getListOfRoles().then((response2) => {
        model['listOfUserRoles'] = response2;
        done();
      })
    });

    this._modelTransformingService.transform(this.model);
    

  }
  
  getListOfUsers() {
    return this.model['listOfUsers'];
  }

  getListOfRoles() {
    return this.model['listOfUserRoles'];
  }

  isDirty() {
   return this.dirty;
  }

  clearUser(){
    this.dirty = false;
    this.hasSelectedUser = false;
    this.selectedUserRoles = ["No","user","selected"];
    this.selectedUser = {};
    this.selectedUserName = "";
  }


  save(roles){
    this.dirty = false;
    return this._permissionsApiService.save(roles).then(() => {
      this._permissionsApiService.getListOfAllUsers();
      this._permissionsApiService.getListOfRoles();
      this.init();
    })
  }

}
