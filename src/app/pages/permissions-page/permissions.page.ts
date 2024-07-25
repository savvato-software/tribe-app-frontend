import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@savvato-software/savvato-javascript-services';
import { AlertService } from 'src/app/_services/alert/alert.service';
import { PermissionsModelService } from './_services/permissions.model.service';
import {LoadingService} from "../../_services/loading-spinner/loading.service";
import { curry } from 'cypress/types/lodash';
import { UserRole } from './_types/user-role.type';





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
    this._permissionsModelService.clearValues();
  }

  // testValues(){
  //   console.log("this is test 1", this._permissionsModelService.getListOfRoles());
  //   console.log("this is test 2", this._permissionsModelService.getListOfUsers());
  //   return "ready";
  // }
  
 
  testArray = ["one","two","three"];

  selectedUser: string = "";

  allRoles = [];

  
 



isDirty(){
  return this._permissionsModelService.isDirty();
}


//****************************start here  */
// either move to model service or change logic to work with dirty 
// dirty needs to compare lists upon changes 
// make list already populate with user selection
// detalied names for variables and functions

  // toggleRoles(role){
  //   //this._permissionsModelService.dirtyOn();
  //   let currentRoles = [];

  //   if (this.isDirty() == false) {
  //     currentRoles = this._permissionsModelService.selectedUserRoles; 
  //   }
  //   else{
  //     currentRoles = this._permissionsModelService.newUserRoles;
  //   }
    
  //   if (currentRoles.includes(role)) {
  //     const remRole = currentRoles.indexOf(role)
  //     currentRoles.splice(remRole,1);
  //   }
  //   else {
  //     currentRoles.push(role);
  //   }
    
  //   // console.log("toggle ", currentRoles);
  //   this._permissionsModelService.newUserRoles = currentRoles;
  //   this._permissionsModelService.newUserRoles.sort();
  // }

  toggleRoles(role) {
    this._permissionsModelService.toggleRoles(role);
  }

  
  checkRole(role) {
    
    if (this.isDirty()){
      return this._permissionsModelService.newUserRoles.includes(role);
    }
    else {
      return this._permissionsModelService.selectedUserRoles.includes(role);
    }
    
  }

  getListOfUsers() {
    return this._permissionsModelService.getListOfUsers();
  }

  getListOfAllRoles(){
      this._permissionsModelService.getListOfAllRoles();
      this._permissionsModelService.getselectedUserRoles(this.selectedUser);
      return this._permissionsModelService.allRoles;
  }
  getselectedUserRoles1() :UserRole{
    return this._permissionsModelService.getselectedUserRoles1();
  }

  // getselectedUserRoles(){
  //   this._permissionsModelService.getselectedUserRoles(this.selectedUser);
  //   console.log('new function ',this._permissionsModelService.selectedUserRoles);
  // }

//   getselectedUserRoles() {
//     console.log("the user is ", this.selectedUser);
//     this.getListOfAllRoles1();
//     if (this.selectedUser !== '' && this.selectedUser !== null) {
//       const selectedUser = this.getlistOfUsers().find(user => user.name === this.selectedUser);
//       this._permissionsModelService.selectedUserRoles = [];
//       for (let r in selectedUser.roles){
//         this._permissionsModelService.selectedUserRoles.push(selectedUser.roles[r].name); // move this!!!
//       }

//       //return this._permissionsModelService.selectedUserRoles;
//     }
//     // else {
//     //   return ["nothing"];
//     // }
//  }


  saveRoleChanges() {
    const selectedUser = this.getListOfUsers().find(user => user.name === this.selectedUser);
    //console.log("user id",selectedUser.id, " and name ", selectedUser.name);
    this.saveMessage();
    let idNumber = selectedUser.id;
    let newRoles = (this._permissionsModelService.newUserRoles);

    console.log("role list ",newRoles);
    console.log("id ", idNumber);
    this._permissionsModelService.save({id:idNumber, permissions:newRoles});
    
    this._permissionsModelService.dirtyOff();  
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
