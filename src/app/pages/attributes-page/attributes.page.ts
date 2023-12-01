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

  headerPageTitle: string = 'Attributes';
  headerPagePrimaryActionButtonText: string = 'Create';

  constructor(private _userService: UserService,
    private _alertService: AlertService,
    private _loadingService: LoadingService,
    private _attributesModelService: AttributesModelService,
    private router: Router) { }

  public ngOnInit() {
 
  }

  ionViewWillEnter() {
    this._loadingService.show({message: "..loading.."}).then(() => {
      this._attributesModelService.init().then(() => {
        this._loadingService.dismiss();
      })
    })
  }


  getAttributes() {
    const attributes = this._attributesModelService.get(); 
    return Object.values(attributes);
  }
  
  deleteAttribute(id: number) {
    const self = this;
    const attributeToDelete = this.getAttributes()[id] as {id: string};
    let msg = "Deleting attribute...";
  
    self._loadingService.show({message: msg}).then(() => {
      self._loadingService.dismiss().then(() => {
        self._alertService.show({
          header: 'Delete Attribute?',
          message: 'Are you sure you want to delete this attribute?',
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                self.navigateTo('attributes');
  
                // Remove the attribute from the frontend
                this._attributesModelService.delete(attributeToDelete.id).then(
                  (response) => {
                    console.log("Call to attributeApiService was successful");
          
                },
                (err) => {
                  console.log("error!!!!!!!!!!!!!!!");
                  }
                );
              }
            },
            {
              text: 'No',
              role: 'cancel' 
            }
          ]
        })
      })
    });
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

  getCreateBtnClickFunc() {
    const self = this;
    return () => {
      self.navigateTo('attributes/create');
    }
  }

  navigateTo(url?: string) {
    url = url || 'nav';
    this.router.navigate([url], { replaceUrl: true });
  }

}
