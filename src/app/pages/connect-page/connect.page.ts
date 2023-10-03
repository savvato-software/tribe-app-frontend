import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.page.html',
  styleUrls: ['./connect.page.scss'],
})
export class ConnectPage implements OnInit {

  constructor(
    private router: Router) { }

  headerPageTitle: string = 'Connect';

  ngOnInit() {
  }

  onGoToListConnectionsBtnClick() {
    this.router.navigate(['/connect/list-connections'])
  }

  onGoToOpenConnectionBtnClick() {
    this.router.navigate(['/connect/open-connection'])
  }

  onGoToAcceptNewConnectionBtnClick() {
    this.router.navigate(['/connect/accept-new-connection'])
  }

  onGoToOpenAcceptNewConnectionBtnClick() {
    this.router.navigate(['/connect/accept-new-connection'])
  }

}
