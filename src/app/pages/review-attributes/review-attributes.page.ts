import { Component, OnInit } from '@angular/core';

import { ReviewAttributesModelService } from "./_services/review-attributes.model.service";

import { AlertService } from '../../_services/alert/alert.service';

@Component({
  selector: 'app-review-attributes',
  templateUrl: './review-attributes.page.html',
  styleUrls: ['./review-attributes.page.scss'],
})

export class ReviewAttributesPage implements OnInit {

  headerPageTitle: string = 'Review Attributes';
  phraseToBeReviewed: String = "";
  getNextPhraseButtonDisabled: boolean = false;
  approveAndRejectButtonDisplayed: boolean = false;

  constructor(private _alertService: AlertService,
              private  _reviewAttributesModelService: ReviewAttributesModelService) { }

  ngOnInit() {
  }

  onRejectPhraseBtnClick() {
    //mock data
   const reasons = this.getListOfReviewDecisionReasons();

    const self = this;

    self._alertService.show({
      header: 'Message rejected',
      subheader: 'Choose a reason why:',
      inputs: reasons.map((rsn) => {
              return {
                  type: 'radio',
                  label: rsn.reason,
                  value: rsn.reason,
                  handler: (data) => {
                    console.log('User choice: ', data.value);
                  }
              }
          }, self),
      buttons: [{
        text: 'OK', role: 'cancel',
        handler: () => {
        }
        }]
    })

    this.phraseToBeReviewed = "";
    this.getNextPhraseButtonDisabled = false;
    this.approveAndRejectButtonDisplayed = false;
  }

  onApprovePhraseBtnClick() {
    const self = this;
    const reasonIDApprove = 1;
    self._reviewAttributesModelService.saveReviewAttributes(reasonIDApprove).then((data) =>{
      console.log(data);
    });
    self._alertService.show({
    header: 'Message approved!',
    buttons: [{
      text: 'OK', role: 'cancel',
      handler: () => {
      }
      }]
    })

    this.phraseToBeReviewed = "";
    this.getNextPhraseButtonDisabled = false;
    this.approveAndRejectButtonDisplayed = false;
  }

  onGetNextPhraseBtnClick() {

    this.getNextPhraseToBeReviewed();
  }

  getNextPhraseToBeReviewed() {
    this._reviewAttributesModelService.getNewPhrase().then((phrase) => {
      const phraseTBRAsString = this.getAttrString(phrase); 
      console.log(phraseTBRAsString);
      this.phraseToBeReviewed = phraseTBRAsString;
      this.getNextPhraseButtonDisabled = true;
      this.approveAndRejectButtonDisplayed = true;
    });
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
    const reasons = [
      {"id": 1, "reason": "approved"},
      {"id": 2, "reason": "doesn't make sense"},
      {"id": 3, "reason": "vulgar"}];
    return reasons;
  }

}
