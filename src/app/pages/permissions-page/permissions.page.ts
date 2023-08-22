import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@savvato-software/savvato-javascript-services';
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
    private _permissionsModelService: PermissionsModelService,
    private _loadingService: LoadingService) {

  }



  ionViewWillEnter() {
    this._loadingService.show({message: "..loading.."}).then(() => {
      this._permissionsModelService.init();
      this._loadingService.dismiss ();
    })
  }

  // is dirty in model service

  hasUserSelected = false;

  role = [];

  availRoles = [];

  selectedSkills = [];

  theCurrentUser = this.getUser();

  selectedUser = {};

  selectUser(user) {
    this.role = [];
    for (let i of user.roles){
    this.role.push(i.name);
    }
    this.selectedUser = user;
    this.selectedSkills = this.role;
    this.hasUserSelected = true;
  }

  clearUser() {
    this.selectedSkills = [];
    this.hasUserSelected = false;

  }

  getUser() {
    return this._authService.getUser();
  }


  getListOfUsers() {
    return this._permissionsModelService.getListOfUsers();
  }


// TRIB --- 117
  getListOfRoles() {
    
    let rolz = this._permissionsModelService.getListOfRoles();
    if (rolz !== undefined && rolz !== null) {
      this.availRoles = [];
      for (let j of Object.values(rolz)) {
        if (this.selectedSkills.includes( j['name'])) {
          console.log("this is in ", j['name'], ' on the list');
          
        }
        else {
          console.log("no sir ", j['name'], " not on the list");
          this.availRoles.push(j['name']);
        }
      }
    } else {
      // Handle the case when rolz is undefined or null, e.g., show an error message.
      console.error("rolz is undefined or null");
    }
    

    return this.availRoles

  }


  saveChanges() {

  }

  cancelChanges() {
    this.router.navigate(['home']);
  }

  removeSkill(skill) {
    let x = this.role.indexOf(skill);
    this.role.splice(x,1)
  }


  runTest(subject) {
  console.log("i have", subject);
  }
}





