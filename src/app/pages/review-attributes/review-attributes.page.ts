import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../_services/alert/alert.service';

@Component({
  selector: 'app-review-attributes',
  templateUrl: './review-attributes.page.html',
  styleUrls: ['./review-attributes.page.scss'],
})
export class ReviewAttributesPage implements OnInit {

  phraseToBeReviewed: String = "";
  getNextPhraseButtonDisabled: boolean = false;
  approveButtonDisabled: boolean = true;
  rejectButtonDisabled: boolean = true;

  constructor(private _alertService: AlertService) { }

  ngOnInit() {
  }

  onRejectPhraseBtnClick() {
    let alertButtons = ['OK'];
    let alertInputs = [
    {
      label: 'Red',
      type: 'radio',
      value: 'red',
    },
    {
      label: 'Blue',
      type: 'radio',
      value: 'blue',
    },
    {
      label: 'Green',
      type: 'radio',
      value: 'green',
    },
  ];
  }

  onApprovePhraseBtnClick() {
    const self = this;
    let msg = 'Message approved!';
    self._alertService.show({
    header: 'Alright!',
    message: msg,
    buttons: [{
      text: 'OK', role: 'cancel',
      handler: () => {
      }
      }]
    })
    this.phraseToBeReviewed = "";
    this.getNextPhraseButtonDisabled = false;
    this.approveButtonDisabled = true;
    this.rejectButtonDisabled = true;
  }

  onGetNextPhraseBtnClick() {
    this.getNextPhraseToBeReviewed();
  }

  getNextPhraseToBeReviewed() {
    const phraseTBR = {"adverb": "competitively", "verb": "writes", "preposition": "nullvalue", "noun": "code" };
    const phraseTBRAsString = this.getAttrString(phraseTBR);
    this.phraseToBeReviewed = phraseTBRAsString;
    this.getNextPhraseButtonDisabled = true;
    this.approveButtonDisabled = false;
    this.rejectButtonDisabled = false;
  }

  getAttrString(tbr) {
    let rtn = "";

    if (tbr.adverb)
      rtn += tbr.adverb + " ";

    rtn += tbr.verb + " ";

    if (tbr.preposition)
      rtn += tbr.preposition + " ";

    rtn += tbr.noun;

    return rtn;
  }

  getListOfReviewDecisionReasons() {
    return
  }

}
