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
    {title: 'Home', url: '/home', icon: 'albums'},
    {title: 'Profile', url: '/profile', icon: 'person'},
    {title: 'Attributes', url: '/attributes', icon: 'list'},
    {title: 'Notifications', url: '/notifications', icon: 'notifications'},
    {title: 'Permissions', url: '/permissions', icon: 'cog'},
    {title: 'Review Attributes', url: '/review-attributes', icon: 'flash'}
  ];

  public loggedOutAppPages = [
    {title: 'Login', url: '/login', icon: 'flash'}
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
