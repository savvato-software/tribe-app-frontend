import { Injectable } from "@angular/core";
import { ReviewAttributesApiService } from "./review-attributes.api.service";
import { ModelTransformingService } from "@savvato-software/savvato-javascript-services";

@Injectable({
  providedIn: "root",
})
export class ReviewAttributesModelService {
  model: any = {};

  constructor(
    private _modelTransformingService: ModelTransformingService,
    private _reviewAttributesApiService: ReviewAttributesApiService
  ) {}

  init() {
    this._modelTransformingService.clearAllTransformers();

    this._modelTransformingService.addTransformer((model, done) => {
      this._reviewAttributesApiService
        .getNextReviewEligiblePhrase()
        .then((response) => {
          model["nextReviewPhrase"] = response;
          done();
        });
    });
    this._modelTransformingService.transform(this.model);
  }

  getNextReviewEligiblePhrase() {
    return this.model["nextReviewPhrase"];
  }
}
