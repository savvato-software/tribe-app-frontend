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

  ngOnInit() {
  }

  onGoToListConnectionsBtnClick() {
    this.router.navigate(['/list-connections'])
  }

}
