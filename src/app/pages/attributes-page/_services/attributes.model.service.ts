import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';

import { AttributesApiService } from "./attributes.api.service";
import {Attribute} from '../../../_type/attribute.type'

import { Constants } from "../../../_constants/constants";

@Injectable({
    providedIn: 'root'
})
export class AttributesModelService {

    model:Attribute[] = [];
    originalAttributes: Attribute[] = [];

    constructor(private _apiService: JWTApiService,
                private _authService: AuthService,
                private _attributesApiService: AttributesApiService,
                private _constants: Constants) {

    }

    init() {
        return new Promise((resolve, reject) => {
            this._attributesApiService.getAttributesByUser().then(
                (rtn:Attribute[]) => {
                    rtn.sort((a, b) => a.sequence - b.sequence)
                    this.originalAttributes = rtn;
                    this.model = JSON.parse(JSON.stringify(rtn));

                    resolve(rtn);
                }
            )
        })
    }


    get() {
        return this.model;
    }

    isDirty(): boolean{
      return JSON.stringify(this.model) !== JSON.stringify(this.originalAttributes);
      }

    save(model:Attribute) {
        return new Promise((resolve, reject) => {
            this._attributesApiService.save(model).then(
                (isPhraseReviewed: boolean) => {
                    console.log("Call to attributeApiService was successful");
                    resolve(isPhraseReviewed);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }

    saveAttributeSequence() {
            return new Promise((resolve, reject) => {
              let phrase = this.model.map(item => {return {
                               'sequence': item.sequence,
                               'phraseId': item.phrase.id
                             };
                         })
              let data = {'phrases': phrase}
                this._attributesApiService.saveSequence(data).then(
                    (booleanMessage: boolean) => {
                        resolve(booleanMessage);
                        console.log("Call to attributeApiService was successful(model) + (booleanMessage)")
                    },
                    (err) => {
                        reject(err);
                    }
                );
            });
        }

    delete(id: number): Promise<any> {
        return this._attributesApiService.delete(id);
    }
}
