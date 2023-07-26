import { Injectable } from '@angular/core';
import { PermissionsApiService } from './permissions.api.service';
import { ModelTransformingService } from '@savvato-software/savvato-javascript-services';

@Injectable({
  providedIn: 'root'
})
export class PermissionsModelService {

  model: any = {};


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
        //console.log(response2, "resp2");
        done();
      })
    });

    this._modelTransformingService.transform(this.model);
    //console.log(this.model, "model service");

  }
  
  getListOfUsers() {
    return this.model['listOfUsers'];
  }

  getListOfRoles() {
    return this.model['listOfUserRoles'];
  }

}
