import { Component, OnInit, Output } from '@angular/core';

import { Router } from '@angular/router';

import { AlertService } from '../../_services/alert/alert.service';
import { UserService } from '../../_services/user/user.service';
import { LoadingService } from "../../_services/loading-spinner/loading.service";
import { AttributesModelService } from "./_services/attributes.model.service";
import { SequenceService, Sequenceable } from '@savvato-software/savvato-javascript-services';
import {Attribute} from '../../_type/attribute.type'
import {Phrase} from '../../_type/phrase.type'

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.page.html',
  styleUrls: ['./attributes.page.scss'],
})

export class AttributesPage implements OnInit {

  headerPageTitle: string = 'Attributes';
  headerPagePrimaryActionButtonText: string = 'Create';
  attributes: Attribute[] = [];
  selectedAttr: Attribute | null = null;
  originalAttributes: Attribute[] = [];

  constructor(private _userService: UserService,
    private _alertService: AlertService,
    private _loadingService: LoadingService,
    private _attributesModelService: AttributesModelService,
    private router: Router,
    private sequenceService: SequenceService
    ) { }

    public ngOnInit() {
      this.loadAttributes();
    }

    ionViewWillEnter() {
      this.loadAttributes();
    }

    loadAttributes() {
      this._loadingService.show({message: "..loading.."}).then(() => {
        this._attributesModelService.init().then(() => {
          this.attributes = this.getAttributes();
          this.originalAttributes = [...this.attributes];
          this._loadingService.dismiss();
        });
      });
    }

  getAttributes(): Attribute[] {
    const attributes: Attribute[] = this._attributesModelService.get();
    return attributes.sort((a, b) => a.sequence - b.sequence);
  }

  selectAttribute(attr: Sequenceable) {
    this.selectedAttr = attr;
  }

  canMoveUp(): boolean {
    return this.selectedAttr && this.selectedAttr['phrase'].sequence > 1;
  }

  canMoveDown(): boolean {
    return this.selectedAttr && this.selectedAttr['phrase'].sequence < this.attributes.length;
  }

  hasChanges(): boolean {
    return JSON.stringify(this.attributes) !== JSON.stringify(this.originalAttributes);
  }

  moveUp() {
    if (this.selectedAttr && this.canMoveUp()) {
      this.sequenceService.moveSequenceByOne(this.attributes, this.selectedAttr, this.sequenceService.UP);
    }
  }

  moveDown() {
    if (this.selectedAttr && this.canMoveDown()) {
      this.sequenceService.moveSequenceByOne(this.attributes, this.selectedAttr, this.sequenceService.DOWN);
    }
  }

  saveChanges() {
    // not implemented
    this.originalAttributes = [...this.attributes];
    console.log('Changes saved:', this.attributes);
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
    if (this.hasChanges()) {
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
