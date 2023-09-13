import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';
import { ReviewAttributesApiService } from "./review-attributes.api.service";
import { Constants } from "../../../_constants/constants";

@Injectable({
    providedIn: 'root'
})
export class ReviewAttributesModelService {

    model: any = {};
    saveReview: any = {};

    constructor(private _apiService: JWTApiService,
                private _authService: AuthService,
                private ReviewAttributesApiService: ReviewAttributesApiService,
                private _constants: Constants) {

    }


    getNewPhrase() {
        return new Promise((resolve, reject) => {
            this.ReviewAttributesApiService.getPhrase().then((response) => {
                    this.model = response;
                   resolve(this.model);
           })
        })   
        
    }

    saveReviewAttributes(reasonId) {
            this.saveReview['reviewId'] = this.model.id;
            this.saveReview['reviewerId'] = this._authService.getUser().id;
            this.saveReview['reasonId'] = reasonId; 
            this.ReviewAttributesApiService.saveRA(this.saveReview).then(() =>{
                console.log("saved Review Attributes");
            });
    }

    get() {
           return this.model;
        
    }
}
