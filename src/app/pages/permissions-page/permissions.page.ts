import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@savvato-software/savvato-javascript-services';
import { AlertService } from 'src/app/_services/alert/alert.service';
import { PermissionsModelService } from './_services/permissions.model.service';
import {LoadingService} from "../../_services/loading-spinner/loading.service";
import { curry } from 'cypress/types/lodash';






@Component({
  selector: 'page-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
})


export class PermissionsPage {

  headerPageTitle: string = 'Permissions';

  constructor( private router: Router,
    private _authService: AuthService,
    private _alertService: AlertService,
    private _permissionsModelService: PermissionsModelService,
    private _loadingService: LoadingService) {

  }


  ionViewWillEnter() {
    this._loadingService.show({message: "..loading.."}).then(() => {
      this._permissionsModelService.init();
      this.clearVlaues();
      this._loadingService.dismiss ();
    })
  }

  clearVlaues(){
    this._permissionsModelService.selectedUserName = "";
    this.selectedUser = "";
    this._permissionsModelService.selectedUserRoles = [];
    this._permissionsModelService.hasSelectedUser = false;
    this._permissionsModelService.dirty = false;
    this._permissionsModelService.newUserRoles = [];
  }

  


  selectedUser: string = "";

  

  getSelectedUser() {
    this.getCurrentUser();
    return this._permissionsModelService.selectedUser;
  }

  getCurrentUser(){    
    console.log('user updated to ', this.selectedUser);
    
    return this.selectedUser;
 }

 getselectedUserRoles() {
  if (this._permissionsModelService.isDirty()){
    if (this.selectedUser !== '' && this.selectedUser !== null) {
      const selectedUser = this.getlistOfUsers().find(user => user.name === this.selectedUser);
      
      this._permissionsModelService.selectedUserRoles = [];
      for (let r in selectedUser.roles){
        console.log("roles are now ",selectedUser.roles[r].name);
        this._permissionsModelService.selectedUserRoles.push(selectedUser.roles[r].name);
        
      }
      console.log("roleList", this._permissionsModelService.selectedUserRoles);
      
      return this._permissionsModelService.selectedUserRoles;
    }
    else {
      return ["nothing"];
    }
  }
  else {
    console.log("I can't let you do that");
  }
  
}




//new -------------------------------------

  toggleRoles(role){
    let currentRoles = [];
    if (this._permissionsModelService.newUserRoles.length == 0) {
      currentRoles = this._permissionsModelService.selectedUserRoles;
    }
    else{
      currentRoles = this._permissionsModelService.newUserRoles;
    }
    
    if (currentRoles.includes(role)) {
      const remRole = currentRoles.indexOf(role)
      currentRoles.splice(remRole,1);
    }
    else {
      currentRoles.push(role);
    }
    // this.getselectedUserRoles();
    console.log("toggle ", currentRoles);
    this._permissionsModelService.newUserRoles = currentRoles;
  }

  
  checkRole(role) {
    if (this._permissionsModelService.newUserRoles.length != 0){
      return this._permissionsModelService.newUserRoles.includes(role);
    }
    else {
      return this._permissionsModelService.selectedUserRoles.includes(role);
    }
    
  }


 

  
  updateRolesList(userRoles){
    this._permissionsModelService.selectedUserRoles = [];
    for (let i of userRoles){
      this._permissionsModelService.selectedUserRoles.push(i.name);
      }
  }


  // refactor this to new variables 
  hasSelectedUser() {
    return this._permissionsModelService.hasSelectedUser
  } 


  getlistOfUsers() {
    this.getselectedUserRoles();
    console.log("user list", this._permissionsModelService.getListOfUsers())
    return this._permissionsModelService.getListOfUsers();
  }

  getListOfAllRoles(){
    let availableRoles = this._permissionsModelService.getListOfRoles();
    let allRoles = [];
    if (availableRoles !== undefined && availableRoles !== null) {
      allRoles = availableRoles.map(role => role['name']);
    }
    
    return allRoles;
  }



  saveRoleChanges() {
    this.saveMessage();
    let idNumber = (this._permissionsModelService.selectedUser["id"]);
    let newRoles = (this._permissionsModelService.selectedUserRoles);
    let newList = (this._permissionsModelService.selectedUser["roles"]);
    let roleList = [];
    for (let role of newList) {
      roleList.push("role list", role);
    }
    
    this._permissionsModelService.save({id:idNumber, permissions:newRoles});
    this._permissionsModelService.clearUser();
    this.updateRolesList(roleList);
    //this.selectUser({});
    
  }

  saveMessage() {
    this._alertService.show({
      header: 'Changes Saved!',
      message: 'Roles Updated',
      buttons:[{
        text: "OK",
        role: 'cancel'}]
    })
  }

  exitToHomePage() {
    if (this._permissionsModelService.isDirty() == false){
      this.router.navigate(['home']);
    }
    else {
      
      this._alertService.show({
        header: 'Changes Not Saved!',
        message: 'Discard changes?',
        buttons: [{
          text: "Go Back",
          role: 'cancel'
        }, {
          text: "Discard" ,
          handler: () => {
            this.router.navigate(['home']);
          }
        }]
      })
      
    }
      
      
  }
}
