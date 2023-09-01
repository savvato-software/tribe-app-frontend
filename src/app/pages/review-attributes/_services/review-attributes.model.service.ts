import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';
import { ReviewAttributesApiService } from "./review-attributes.api.service";
import { ReviewAttributesPageModule } from "../review-attributes.page.module";
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
        /**return new Promise((resolve, reject) => {
           //this.model = this.ReviewAttributesApiService.getPhrase();
          // resolve(this.model);
         this.ReviewAttributesApiService.getPhrase().then((response) => {
                this.model = response;
                resolve(this.model);
            })
            
        })**/
        this.ReviewAttributesApiService.getPhrase().then((response) => {
                //if(response != undefined){
                    this.model = response;
                    return this.model;
               // }
               // else{
                //    throw new Error("no more phrase");
               // }
        })
            
        
    }

    saveReviewAttributes(reviewId, reasonId) {
            this.saveReview['reviewId'] = reviewId;
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
