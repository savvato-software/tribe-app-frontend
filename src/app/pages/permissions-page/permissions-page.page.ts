import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileModelService } from '../profile-page/_services/profile.model.service';

import {AuthService} from "@savvato-software/savvato-javascript-services";

import * as moment from 'moment'
import {LoadingService} from "../../_services/loading-spinner/loading.service";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-permissions-page',
  templateUrl: './permissions-page.page.html',
  styleUrls: ['./permissions-page.page.scss'],
})


export class PermissionsPagePage implements OnInit {

  constructor(private router: Router,
    private _profileModelService: ProfileModelService,
    private _loadingService: LoadingService,
    private _menuController: MenuController,
    private _authService: AuthService) {

}

public ngOnInit() {

}

ionViewWillEnter() {
this._loadingService.show({message: "..loading.."}).then(() => {
this._profileModelService.init(this._authService.getUser()['id']).then(() => {
this._loadingService.dismiss();
})
})
}

onEditBtnClick() {
this.navigateTo('profile/edit');
}

getAssociatedImage() {
return this._profileModelService.get()['image'];
}

getUsername() {
return this._profileModelService.get()['name'];
}

getPhoneNumber() {
return this._profileModelService.get()['phone'];
}

getEmail() {
return this._profileModelService.get()['email'];
}

getMemberSince() {
return moment.unix(this._profileModelService.get()['created'] / 1000).fromNow();
}

onHomeBtnClick() {
this.navigateTo("home");
}

onTopicBtnClick() {
this.router.navigate(['/topic'])
}

onNewTopicBtnClick() {
this.router.navigate(['/topic/create'])
}

onProfileBtnClick() {
}

onSettingsBtnClick() {
this._menuController.open();
}

navigateTo(url?: string) {
url = url || 'nav';
this.router.navigate([url], { replaceUrl: true });
}
}
