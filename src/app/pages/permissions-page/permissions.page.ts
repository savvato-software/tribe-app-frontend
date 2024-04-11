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
      this._loadingService.dismiss ();
    })
  }

  
  selectedRole: string = '';

  selectedUser: string = "";

  isUserSelected(user){
    return user === this._permissionsModelService.selectedUser;
  }

  getCurrentUser(){
    
    console.log('user updated to ', this.selectedUser);
    return this.selectedUser;
 }

 getselectedUserRoles() {
  if (this.selectedUser !== '' && this.selectedUser !== null) {
  const selectedUser = this.getlistOfUsers().find(user => user.name === this.selectedUser);
  let roleList = [];
  for (let r in selectedUser.roles){
    console.log("roles are now ",selectedUser.roles[r].name);
    roleList.push(selectedUser.roles[r].name);
  }
  console.log("roleList", roleList);
  return roleList;
  }
  else {
    return ["nothing"];
  }
}


 testRole(role) {
  //console.log("the selected role is ", role);
  
  // Remove highlighting from previously selected role
  if (this.selectedRole === role) {
    // Clear the selected role
    this.clearSelectedRole();
  } else {
    // Assign the new selected role
    this.selectedRole = role;
  }
}




  checkRole(role) {
    //console.log("checking for ", role);
    return role === this.selectedRole;
  }

  checknotRole(role) {
    return role != this.selectedRole;
  } 

  testUser() {
    console.log(this.selectedUser);
  }

  clearSelectedRole() {
    this.selectedRole = '';
  }


  
  updateRolesList(userRoles){
    this._permissionsModelService.selectedUserRoles = [];
    for (let i of userRoles){
      this._permissionsModelService.selectedUserRoles.push(i.name);
      }
  }


  hasSelectedUser() {
    return this._permissionsModelService.hasSelectedUser
  } 


  getlistOfUsers() {
    console.log("user list", this._permissionsModelService.getListOfUsers())
    return this._permissionsModelService.getListOfUsers();
  }

  getlistOfAvailableRoles() {
    let availableRoles = [];
    let allroles = this._permissionsModelService.getListOfRoles();
    if (allroles !== undefined && allroles !== null) {
      availableRoles = [];
      for (let j of Object.values(allroles)) {
        if (this._permissionsModelService.selectedUserRoles.includes( j['name'])) {
          continue;
        }
        else {
          availableRoles.push(j['name']);
        }
      }
    }


    return availableRoles;

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
      this._permissionsModelService.selectedUserName = "";
      this._permissionsModelService.selectedUserRoles = [];
      this._permissionsModelService.hasSelectedUser = false;
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
            this._permissionsModelService.dirty = false;
            this._permissionsModelService.selectedUserName = "";
            this._permissionsModelService.selectedUserRoles = [];
            this._permissionsModelService.hasSelectedUser = false;
            this.router.navigate(['home']);
          }
        }]
      })
      
    }
      
      
  }
}
