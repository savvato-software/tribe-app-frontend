import { Component, OnInit, Output } from '@angular/core';

import { Router } from '@angular/router';

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
    private _attributesModelService: AttributesModelService,
    private router: Router) { }

  ngOnInit() {

  }

  getAttributes() {
    // await this._attributesModelService.getAttributesByUser();

    return [
        {
            "phrase": {
                "adverb": "competitively",
                "verb": "writes",
                "preposition": null,
                "noun": "code"
            }
        },
        {
            "phrase": {
                "adverb": null,
                "verb": "plays",
                "preposition": null,
                "noun": "chess"
            }
        }
    ];
  }

  getAttrString(attr) {
    let rtn = "";

    if (attr.phrase.adverb)
      rtn += attr.phrase.adverb + " ";

    rtn += attr.phrase.verb + " ";

    if (attr.phrase.preposition)
      rtn += attr.phrase.preposition + " ";

    rtn += attr.phrase.noun;

    return rtn;
  }

  onCreateBtnClick() {
      this.navigateTo('attributes/create');
  }

  navigateTo(url?: string) {
    url = url || 'nav';
    this.router.navigate([url], { replaceUrl: true });
  }

}
