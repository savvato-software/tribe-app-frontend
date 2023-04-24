import { Component } from '@angular/core';




@Component({
  selector: 'page-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
})


export class PermissionsPage {

  permissions = [
    "one",
    "two",
    "three",
    "four",
    "reviewer",
    "observer"
  ]

  saveChanges() {

  }

  cancelChanges() {

  }

}





