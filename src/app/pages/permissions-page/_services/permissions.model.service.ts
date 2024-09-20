import { Injectable } from '@angular/core';
import { PermissionsApiService } from './permissions.api.service';
import { ModelTransformingService } from '@savvato-software/savvato-javascript-services';
import { UserRole } from '../_types/user-role.type';
import { User } from '../_types/user.type';


@Injectable({
  providedIn: 'root'
})
export class PermissionsModelService {

  model: {} = {};

  dirty = false;

  allRoles = [];

  selectedUserRoles = [];

  newUserRoles = [];


  


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

  isDirty(): boolean {
    return this.dirty;
  }

  clearValues(){
    this.selectedUserRoles = [];
    this.dirty = false;
    this.newUserRoles = [];
  }






  save(roles){
    
    console.log("saving in model");
    return this._permissionsApiService.save(roles).then(() => {
      console.log("saving in model success");
      this.dirty = false;
      this.newUserRoles = [];
      this._permissionsApiService.getListOfAllUsers();
      this._permissionsApiService.getListOfRoles();
      this.init();
    })
  }

}
