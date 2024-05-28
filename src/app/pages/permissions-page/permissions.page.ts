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
    
    this.selectedUser = "";
    //--------------move to model????-------------
    this._permissionsModelService.selectedUserRoles = [];
    this._permissionsModelService.dirty = false;
    this._permissionsModelService.newUserRoles = [];
    //--------------move to model????-------------
  }

  


  selectedUser: string = "";

  
 getselectedUserRoles() {
    if (this.selectedUser !== '' && this.selectedUser !== null) {
      const selectedUser = this.getlistOfUsers().find(user => user.name === this.selectedUser);
      this._permissionsModelService.selectedUserRoles = [];
      for (let r in selectedUser.roles){
        this._permissionsModelService.selectedUserRoles.push(selectedUser.roles[r].name);
      }

      return this._permissionsModelService.selectedUserRoles;
    }
    else {
      return ["nothing"];
    }
}


  toggleRoles(role){
    this._permissionsModelService.dirty = true;
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
    
    // console.log("toggle ", currentRoles);
    this._permissionsModelService.newUserRoles = currentRoles;
  }

  isDirty(){
    return this._permissionsModelService.isDirty();
  }
  
  checkRole(role) {
    
    if (this._permissionsModelService.newUserRoles.length != 0 || this.isDirty()){
      return this._permissionsModelService.newUserRoles.includes(role);
    }
    else {
      return this._permissionsModelService.selectedUserRoles.includes(role);
    }
    
  }

  getlistOfUsers() {
    return this._permissionsModelService.getListOfUsers();
  }

  getListOfAllRoles(){
    let availableRoles = this._permissionsModelService.getListOfRoles();
    let allRoles = [];
    if (availableRoles !== undefined && availableRoles !== null) {
      allRoles = availableRoles.map(role => role['name']);
    }
    this.getselectedUserRoles();
    return allRoles;
  }



  saveRoleChanges() {
    const selectedUser = this.getlistOfUsers().find(user => user.name === this.selectedUser);
    //console.log("user id",selectedUser.id, " and name ", selectedUser.name);
    this.saveMessage();
    let idNumber = selectedUser.id;
    let newRoles = (this._permissionsModelService.newUserRoles);

    //console.log("role list ",newRoles);
    
    this._permissionsModelService.save({id:idNumber, permissions:newRoles});
    
    this._permissionsModelService.dirty = false;  
    this._permissionsModelService.newUserRoles = [];
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
    if (this._permissionsModelService.dirty == false){
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
