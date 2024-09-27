import { Component, OnInit, Output } from '@angular/core';

import { Router } from '@angular/router';

import { AlertService } from '../../_services/alert/alert.service';
import { UserService } from '../../_services/user/user.service';
import { LoadingService } from "../../_services/loading-spinner/loading.service";
import { AttributesModelService } from "./_services/attributes.model.service";
import { SequenceService, Sequenceable } from '@savvato-software/savvato-javascript-services';
import {Attribute} from '../../_type/attribute.type'

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.page.html',
  styleUrls: ['./attributes.page.scss'],
})

export class AttributesPage implements OnInit {

  headerPageTitle: string = 'Attributes';
  headerPagePrimaryActionButtonText: string = 'Create';
  selectedAttr: Attribute | null = null;


  constructor(private _userService: UserService,
    private _alertService: AlertService,
    private _loadingService: LoadingService,
    private _attributesModelService: AttributesModelService,
    private router: Router,
    ) {}

    public ngOnInit() {
      this.loadAttributes();
    }

    loadAttributes() {
      this._loadingService.show({message: "..loading.."}).then(() => {
        this._attributesModelService.init().then(() => {
          this._loadingService.dismiss();
        });
      });
    }

  getAttributes():Attribute[] {
      const attributes: Attribute[] = this._attributesModelService.get();
      return attributes;
    }

  selectAttribute(attr: Attribute) {
    this._attributesModelService.setSelectedAttr(attr);
  }

  isSelected(attr: Attribute): boolean {
      return this._attributesModelService.isSelected(attr);
  }

  canMoveUp(): boolean {
    return this._attributesModelService.canMoveUp();
  }

  canMoveDown(): boolean {
    return this._attributesModelService.canMoveDown();
  }

  isSaveEnabled(): boolean {
    //returns true if there is a change
    let isDirty = this._attributesModelService.isDirty();
    return isDirty;
 }

  moveUp() {
    this._attributesModelService.moveUp();
  }

  moveDown() {
    this._attributesModelService.moveDown();
  }

  saveChanges() {
    this._attributesModelService.saveAttributeSequences()
    .then((response) => {
      console.log("Call to attributeApiService was successful");
      return this._attributesModelService.init()
       })
    .then(() => {
      this.selectedAttr = null;
//       this.navigateTo('attributes');
      })
    .catch((err) => {
      console.error("Error saving changes or reloading attributes", err);
    });
  }

  deleteAttribute(id: number) {
    const self = this;
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

                this._attributesModelService.delete(id).then(
                  (response) => {
                   console.log("Call to attributeApiService was successful");
                   // Fetch the updated attributes
                   this._attributesModelService.init().then(() => {
                    // Navigate to the 'attributes' page after the deletion is complete
                    self.navigateTo('attributes');
                   });
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

  ionViewWillLeave() {
    if (this._attributesModelService.isDirty()) {
      this._alertService.show({
        header: 'Unsaved Changes',
        message: 'You have unsaved changes. Do you want to save before leaving?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.saveChanges();
              this.navigateTo();
            }
          },
          {
            text: 'No',
            role: 'cancel'
          }
        ]
      });
    }
  }
}
