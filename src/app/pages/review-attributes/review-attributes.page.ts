import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-attributes',
  templateUrl: './review-attributes.page.html',
  styleUrls: ['./review-attributes.page.scss'],
})
export class ReviewAttributesPage implements OnInit {

  phraseToBeReviewed:String = "";
  getNextPhraseButtonDisabled:boolean = false;
  approveButtonDisabled:boolean = true;
  rejectButtonDisabled:boolean = true;

  constructor() { }

  ngOnInit() {
  }

  onRejectPhraseBtnClick() {
    throw new Error('Method not implemented.');
  }

  onApprovePhraseBtnClick() {
    throw new Error('Method not implemented.');
  }

  onGetNextPhraseBtnClick() {
    this.getNextPhraseToBeReviewed();
  }

  getNextPhraseToBeReviewed() {
    const phraseTBR = {"adverb": "competitively", "verb": "writes", "preposition": "nullvalue", "noun": "code"};
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
