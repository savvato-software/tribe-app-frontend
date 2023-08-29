import { Component } from '@angular/core';
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


  hasSelectedUser = false;

  selectedUserRoles = [];

  selectedUserName = "";

  selectUser(user) {
    if (this._permissionsModelService.isDirty() == false) {
      this.selectedUserRoles = [];
      for (let i of user.roles){
      this.selectedUserRoles.push(i.name);
      }
      this.selectedUserName = user.name;
      this.hasSelectedUser = true;
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
            this.selectUser(user);
          }
        }]
      })
    }
  }

  clearUser() {
    this.selectedUserRoles = [];
    this.hasSelectedUser = false;

  }

  getCurrentUserName() {
    return this._authService.getUser().name;
  }


  getListOfUsers() {
    return this._permissionsModelService.getListOfUsers();
  }



  getListOfRoles() {
    let availableRoles = [];
    let allroles = this._permissionsModelService.getListOfRoles();
    if (allroles !== undefined && allroles !== null) {
      availableRoles = [];
      for (let j of Object.values(allroles)) {
        if (this.selectedUserRoles.includes( j['name'])) {
          continue;
        }
        else {
          availableRoles.push(j['name']);
        }
      }
    } else {
      console.error("Available role list is undefined or null");
    }


    return availableRoles;

  }


  saveChanges() {

  }

  cancelChanges() {
    this.router.navigate(['home']);
  }

  addRole(role) {
    console.log("we added ", role , " to the party");
    this.selectedUserRoles.push(role);
  }

  removeRole(skill) {
    let x = this.selectedUserRoles.indexOf(skill);
    this.selectedUserRoles.splice(x,1);
    this._permissionsModelService.dirty = true;
  }
}





