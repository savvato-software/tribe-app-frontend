import { Component } from '@angular/core';
import { AuthService } from "@savvato-software/savvato-javascript-services";
import { Router } from '@angular/router';
import { MenuController } from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public loggedInAppPages =  [
    {title: 'Home', url: '/home', icon: 'albums', dataTestName: 'home-menu-item'},
    {title: 'Profile', url: '/profile', icon: 'person', dataTestName: 'profile-menu-item'},
    {title: 'Attributes', url: '/attributes', icon: 'list', dataTestName: 'attributes-menu-item'},
    {title: 'Notifications', url: '/notifications', icon: 'notifications', dataTestName: 'notifications-menu-item'},
    {title: 'Permissions', url: '/permissions', icon: 'cog', dataTestName: 'permissions-menu-item'},
    {title: 'Review Attributes', url: '/review-attributes', icon: 'flash', dataTestName: 'review-attributes-menu-item'},
    {title: 'Connect', url: '/connect', icon: 'contract', dataTestName: 'connect-menu-item'}
  ];

  public loggedOutAppPages = [
    {title: 'Login', url: '/login', icon: 'flash', dataTestName: 'login-menu-item'}
  ];

  constructor(private _authService: AuthService,
              private _menuController: MenuController,
              private router: Router) {
    this._authService.logout();
  }

  isLoggedIn() {
    return this._authService.isLoggedIn();
  }

  getUserName() {
    return this._authService.getUser()['name'];
  }

  onLogoutBtnClick() {
    this._authService.logout();

    this.router.navigate(['/login'])

    this._menuController.close();
  }

  getAppPages() {
    if (this._authService.isLoggedIn()) {
      return this.loggedInAppPages;
    } else {
      return this.loggedOutAppPages;
    }
  }
}
