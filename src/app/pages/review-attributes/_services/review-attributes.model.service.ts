import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';
import { ReviewAttributesApiService } from "./review-attributes.api.service";
import { Constants } from "../../../_constants/constants";

@Injectable({
    providedIn: 'root'
})
export class ReviewAttributesModelService {

    model: any = {};
    reasonList: any = [];
    saveReview: any = {};

    constructor(private _apiService: JWTApiService,
        private _authService: AuthService,
        private ReviewAttributesApiService: ReviewAttributesApiService,
        private _constants: Constants) {

    }


    getNewPhrase() {
        return this.ReviewAttributesApiService.getPhrase().then((response) => {
            this.model = response;
        })
        
        
    }

    getReasonList() {
        return this.ReviewAttributesApiService.getReasonListApi().then((response) => {
            this.reasonList = response;
        })
         
    }

    saveReviewAttributes(reasonId) {
        console.log(this.model.id);
        this.saveReview['reviewId'] = this.model.toBeReviewedId;
        this.saveReview['userId'] = this._authService.getUser().id;
        this.saveReview['reasonId'] = reasonId; 
        return this.ReviewAttributesApiService.saveRA(this.saveReview).then(() =>{
            console.log("Succesfully Saved Review Attributes");
        });
            
    }

    get() {
        return this.model;
    }

  getNextReviewEligiblePhrase() {
    return this.model["nextReviewPhrase"] && this.model["nextReviewPhrase"][0];
  }
}
