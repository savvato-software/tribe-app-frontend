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
        return new Promise((resolve, reject) => {
            this.ReviewAttributesApiService.getPhrase().then((response) => {
                if(response == null)
                    resolve(response);
                else{
                    this.model = response;
                    resolve(this.model);
                }
           })
        })   
        
    }

    getReasonList() {
        return new Promise((resolve, reject) => {
            this.ReviewAttributesApiService.getReasonListApi().then((response) => {
                    this.reasonList = response;
                    resolve(this.reasonList);
           })
        })   
        
    }

    saveReviewAttributes(reasonId) {
            console.log(this.model.id);
            this.saveReview['reviewId'] = this.model.toBeReviewedId;
            this.saveReview['userId'] = this._authService.getUser().id;
            this.saveReview['reasonId'] = reasonId; 
            return new Promise((resolve, reject) => {
                this.ReviewAttributesApiService.saveRA(this.saveReview).then(() =>{
                    console.log("saved Review Attributes");
                    resolve(this.saveReview);
                });
            }) 
    }

    get() {
           return this.model;
        
    }
}
