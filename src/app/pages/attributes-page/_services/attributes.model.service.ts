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
                    this.originalAttributes = rtn;
                    this.model = [...this.originalAttributes]
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
            this._attributesApiService.save(this.model).then(
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
/* {
    "phrase": {
        "id": 3,
        "adverb": "",
        "verb": "sculpts",
        "preposition": "with",
        "noun": "clay"
    },
    "userCount": 1,
    "sequence": 1
} */
    saveAttributeSequence() {
            return new Promise((resolve, reject) => {
              let phrase = this.model.map(item => {return {
                               'sequence': item.sequence,
                               'phraseId': item.phrase.id
                             };
                         })
              let data = {'phrases': phrase}
                this._attributesApiService.saveSequence(data).then(
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

    delete(id: number): Promise<any> {
        return this._attributesApiService.delete(id);
    }
}
