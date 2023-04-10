import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileModelService } from '../profile-page/_services/profile.model.service';

import {AuthService} from "@savvato-software/savvato-javascript-services";

import * as moment from 'moment'
import {LoadingService} from "../../_services/loading-spinner/loading.service";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-permissions-page',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
})


export class PermissionsPage implements OnInit {

  constructor(private router: Router,
    private _menuController: MenuController) {

}

public ngOnInit() {

}


onEditBtnClick() {
this.navigateTo('profile/edit');
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
