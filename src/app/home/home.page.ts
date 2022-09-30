import {Component, ElementRef, NgZone, OnInit, QueryList, ViewChildren} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from "@savvato-software/savvato-javascript-services";
import {createAnimation, Gesture, GestureController, IonCard, Platform, MenuController} from "@ionic/angular";
import {PictureService} from "../_services/picture/picture.service";
import {Constants} from "../_constants/constants";
import {LoadingService} from "../_services/loading-spinner/loading.service";
import {AlertService} from "../_services/alert/alert.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChildren(IonCard, {read: ElementRef}) cards: QueryList<ElementRef>

  modelList: any = [];

  constructor(private _authService:AuthService,
              private _alertService: AlertService,
              private _pictureService: PictureService,
              private _loadingService: LoadingService,
              private _gestureCtrl: GestureController,
              private zone: NgZone,
              private platform: Platform,
              private _menuController: MenuController,
              private _constants: Constants,
              private router: Router) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this._pictureService.init();
    this._loadingService.show({message: "..loading.."}).then(() => {

    })
  }

  getAssociatedImageCSS(topic) {
    return "";
  }

  getUserName() {
    return this._authService.getUser().name;
  }

  onLogoutBtnClick() {
    this._authService.logout();
    this.router.navigate(['/login'])
  }

  onHomeBtnClick() {
  }

  onProfileBtnClick() {
    this.router.navigate(['/profile'])
  }

  onSettingsBtnClick() {
    this._menuController.open();
  }
}
