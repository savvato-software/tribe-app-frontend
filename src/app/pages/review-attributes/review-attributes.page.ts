import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-attributes',
  templateUrl: './review-attributes.page.html',
  styleUrls: ['./review-attributes.page.scss'],
})
export class ReviewAttributesPage implements OnInit {

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
    return [{
      "phrase": {
        "adverb": "competitively", "verb": "writes", "preposition": "nullvalue", "noun": "code"
      }
    }
    ];
  }

}
