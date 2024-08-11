import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@savvato-software/savvato-javascript-services';
import { AlertService } from 'src/app/_services/alert/alert.service';
import { PermissionsModelService } from './_services/permissions.model.service';
import {LoadingService} from "../../_services/loading-spinner/loading.service";
import { curry } from 'cypress/types/lodash';
import { UserRole } from './_types/user-role.type';
import { User } from './_types/user.type'; 
import { IonSelect } from '@ionic/angular';






@Component({
  selector: 'page-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
})


export class PermissionsPage {

  @ViewChild('users-dropdown', { static: false }) usersDropdown: IonSelect;
  headerPageTitle: string = 'Permissions';

  constructor( private router: Router,
    // private _authService: AuthService,
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
    this._permissionsModelService.clearValues();
  }

  selectedUser: string = "";


  isDirty(): boolean {  
    return this._permissionsModelService.isDirty();
  }

  toggleRoles(role: string) {
    this._permissionsModelService.toggleRoles(role);
  }

  
  checkRole(role: string) {
    
    if (this.isDirty()){
      return this._permissionsModelService.newUserRoles.includes(role);
    }
    else {
      return this._permissionsModelService.selectedUserRoles.includes(role);
    }
    
  }

  getListOfUsers(): User[] {
    return this._permissionsModelService.getListOfUsers();
  }

  getListOfAllRoles(){
      return this._permissionsModelService.getListOfAllRoles(this.selectedUser);
  }


  saveRoleChanges() {
    const selectedUser = this.getListOfUsers().find(user => user.name === this.selectedUser);
    let idNumber = selectedUser.id;
    let newRoles = (this._permissionsModelService.newUserRoles);
    this._permissionsModelService.save({id:idNumber, permissions:newRoles});
    this.saveMessage();
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
    if (this.isDirty() == false){
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
