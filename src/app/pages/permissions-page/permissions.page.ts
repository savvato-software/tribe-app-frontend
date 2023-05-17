import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsModelService } from './_services/permissions.model.service';
import {LoadingService} from "../../_services/loading-spinner/loading.service";




@Component({
  selector: 'page-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
})


export class PermissionsPage {


  constructor( private router: Router,
    private _permissionsModelService: PermissionsModelService,
    private _loadingService: LoadingService) {

  }

  

  ionViewWillEnter() {
    this._loadingService.show({message: "..loading.."}).then(() => { 
      this._permissionsModelService.initUser();
      this._permissionsModelService.init().then(() => {
        this._permissionsModelService.initRoles().then(() => {
          this._loadingService.dismiss ();
          
        })
      })
    })
    
  }


  currentUser() {
    return this._permissionsModelService.getCurrentName();
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





