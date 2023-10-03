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

  selectedUserName = "";

  


  constructor(
    private _modelTransformingService: ModelTransformingService,
    private _permissionsApiService: PermissionsApiService) { }

  init() {
    this._modelTransformingService.clearAllTransformers();

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

  save(roles) {
    return new Promise((resolve, reject) => {
        this._permissionsApiService.save(roles).then(
            (rtn) => {
                console.log("Call to attributeApiService was successful");
                resolve({"successful": rtn});
            },
            (err) => {
                console.log('error in model');
                reject(err);
            }
        );
    });
  }

  save1() {
    this._permissionsApiService.save1();
  }


  /*
  save(model: {}) {
    return new Promise((resolve, reject) => {
        this._attributesApiService.save(model).then(
            (rtn) => {
                console.log("Call to attributeApiService was successful");
                resolve({"successful": rtn});
            },
            (err) => {
                reject(err);
            }
        );
    });
  }*/

}
