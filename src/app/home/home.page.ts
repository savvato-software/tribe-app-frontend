import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from "@savvato-software/savvato-javascript-services";
import {IonCard, MenuController} from "@ionic/angular";
import {PictureService} from "../_services/picture/picture.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChildren(IonCard, {read: ElementRef}) cards: QueryList<ElementRef>

  modelList: any = [];
  headerPageTitle: string = "Home";

  constructor(private _authService:AuthService,
              private _pictureService: PictureService,
              private _menuController: MenuController,
              private router: Router) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this._pictureService.init();
    //this._loadingService.show({message: "..loading.."}).then(() => {
    // Do nothing
    //})
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

  onGoToAttritubesBtnClick() {
    this.router.navigate(['/attributes'])
  }

  onGoToNotificationBtnClick() {
    this.router.navigate(['/notifications'])
  }

  onGoToPermissionsBtnClick() {
    this.router.navigate(['/permissions'])
  }

  onGoToConnectBtnClick() {
    this.router.navigate(['/connect'])
  }

  onGoToReviewAttributesBtnClick() {
    this.router.navigate(['/review-attributes'])
  }
}
