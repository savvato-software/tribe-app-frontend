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

  selectedSkills = [];

  theCurrentUser = this.getUser();

  selectedUser = {};

  
  
  selectUser(user) {
    let role = [];
    for (let i of user.roles){
    role.push(i.name);
    }
    this.selectedUser = user;
    this.selectedSkills = role;
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
    return this._permissionsModelService.getListOfRoles();
  }

  saveChanges() {

  }

  cancelChanges() {

  }

  


  navigateTo(url?: string) {
    url = url || 'nav';
    this.router.navigate([url], { replaceUrl: true });
  }
}





