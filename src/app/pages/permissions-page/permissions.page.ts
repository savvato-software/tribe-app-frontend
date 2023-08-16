import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@savvato-software/savvato-javascript-services';
import { PermissionsModelService } from './_services/permissions.model.service';
import {LoadingService} from "../../_services/loading-spinner/loading.service";






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

  hasUser = false;

  role = [];

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
    this.hasUser = true;
  }
  
  clearUser() {
    this.selectedSkills = [];
    this.hasUser = false;
    
  }

  getUser() {
    return this._authService.getUser();
  }
  
  
  getListOfUsers() {
    return this._permissionsModelService.getListOfUsers();
  }

  getListOfRoles() {
    let res = this._permissionsModelService.getListOfRoles();
    
    return res
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
}





