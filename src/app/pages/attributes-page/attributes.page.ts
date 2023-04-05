import { Component, OnInit, Output } from '@angular/core';

import { AlertService } from '../../_services/alert/alert.service';
import { UserService } from '../../_services/user/user.service';
import { LoadingService } from "../../_services/loading-spinner/loading.service";
import { AttributesModelService } from "./_services/attributes.model.service";

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.page.html',
  styleUrls: ['./attributes.page.scss'],
})
export class AttributesPage implements OnInit {

  constructor(private _userService: UserService,
    private _alertService: AlertService,
    private _loadingService: LoadingService,
    private _attributesModelService: AttributesModelService,) { }

  ngOnInit() {

  }

  async getAttributes() {
    await this._attributesModelService.getAttributesByUser();
  }

  getAttrString(attr) {
    let rtn = "";

    if (attr.adverb)
      rtn += attr.adverb + " ";

    rtn += attr.verb + " ";

    if (attr.preposition)
      rtn += attr.preposition + " ";

    rtn += attr.noun;

    return rtn;
  }
}
