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

  dirtyOn() {
    this.dirty = true;
  }

  dirtyOff() {
    this.dirty = false;

  }

  
  getListOfUsers(): User[] {
    return this.model['listOfUsers'];
  }


  getListOfAllRoles(user) {
    let availableRoles = this.model['listOfUserRoles'];
    this.allRoles = [];
    if (availableRoles !== undefined && availableRoles !== null) {
      this.allRoles = availableRoles.map(role => role['name']);
      this.allRoles.sort();
      this.getselectedUserRoles(user)
      return this.allRoles;
    }
  }

  
   getselectedUserRoles(currentUser) {
    console.log("the user is ", currentUser);
    if (currentUser !== '' && currentUser !== null) {
      const selectedUser = this.model['listOfUsers'].find(user => user.name === currentUser);
      this.selectedUserRoles = [];
      for (let r in selectedUser.roles){
        this.selectedUserRoles.push(selectedUser.roles[r].name);
      }
      this.selectedUserRoles.sort();

    }
  }

    toggleRoles1(role: string){
    let currentRoles = [];

    if (this.newUserRoles.length == 0) {
      
      currentRoles = this.selectedUserRoles; 
    }
    else{
      currentRoles = this.newUserRoles;
    }
    
    if (currentRoles.includes(role)) {
      const remRole = currentRoles.indexOf(role)
      currentRoles.splice(remRole,1);
    }
    else {
      currentRoles.push(role);
    }
    
    
    this.newUserRoles = currentRoles;
    this.newUserRoles.sort();

    if (this.selectedUserRoles.toString() == this.newUserRoles.toString()) {
      console.log('is not dirty');
      this.dirtyOff();
      
      
    }
    else {
      console.log('is dirty');
      this.dirtyOn();
    }

    console.log("current state ", this.dirty);
    console.log("selected ",this.selectedUserRoles);
    console.log("new ",this.newUserRoles);
    
  }

  toggleRoles(role: string){

    if (this.newUserRoles.length == 0) {
      this.newUserRoles = this.selectedUserRoles.map(role => role); 
    }

    if (this.newUserRoles.includes(role)) {
      const remRole = this.newUserRoles.indexOf(role)
      this.newUserRoles.splice(remRole,1);
    }
    else {
      this.newUserRoles.push(role);
    }
    
    this.newUserRoles.sort();

    if (this.selectedUserRoles.toString() == this.newUserRoles.toString()) {
      console.log('is not dirty');
      this.dirtyOff();
    }

    else {
      console.log('is dirty');
      this.dirtyOn();
    }

  }



  getListOfRoles(): UserRole {
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
