import { Injectable } from '@angular/core';
import {AuthService, JWTApiService, SequenceService} from '@savvato-software/savvato-javascript-services';

import { AttributesApiService } from "./attributes.api.service";
import {Attribute} from '../../../_type/attribute.type'

import { Constants } from "../../../_constants/constants";

@Injectable({
    providedIn: 'root'
})
export class AttributesModelService {

    model:Attribute[] = [];
    originalAttributes: Attribute[] = [];
    selectedAttr: Attribute | null = null;

    constructor(private _apiService: JWTApiService,
                private _authService: AuthService,
                private _attributesApiService: AttributesApiService,
                private _sequenceService: SequenceService,
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
        return this.model.sort((a, b) => a.sequence - b.sequence);
    }

    isDirty(): boolean{
      return JSON.stringify(this.model) !== JSON.stringify(this.originalAttributes);
      }

    setSelectedAttr(attr: Attribute) {
        this.selectedAttr = attr;
    }

    isSelected(attr: Attribute): boolean {
        return this.selectedAttr && attr && (this.selectedAttr.phrase.id === attr.phrase.id);
    }

    canMoveUp() {
        if (this.model.length > 0 && this.selectedAttr) {
            return this._sequenceService.isAbleToMove(this.model, this.selectedAttr, this._sequenceService.UP);
        }

        return false;
    }

    canMoveDown() {
        if (this.model.length > 0 && this.selectedAttr) {
            return this._sequenceService.isAbleToMove(this.model, this.selectedAttr, this._sequenceService.DOWN);
        }

        return false;
    }

    moveUp() {
        this._sequenceService.moveSequenceByOne(this.model, this.selectedAttr, this._sequenceService.UP);
    }

    moveDown() {
        this._sequenceService.moveSequenceByOne(this.model, this.selectedAttr, this._sequenceService.DOWN);
    }

    save(model:Attribute) {
        return new Promise((resolve, reject) => {
            this._attributesApiService.save(model).then(
                (isPhraseAssociatedWithUser: boolean) => {
                    console.log("Call to attributeApiService was successful. Returned " + isPhraseAssociatedWithUser);
                    resolve(isPhraseAssociatedWithUser);
                },
                (err) => {
                    reject(err);
                }
            );
        });
    }

    saveAttributeSequences() {
            return new Promise((resolve, reject) => {
              let listOfPhraseIdSequencePairs = this.model.map(item => {return {
                               'sequence': item.sequence,
                               'phraseId': item.phrase.id
                             };
                         })
              let data = {'phrases': listOfPhraseIdSequencePairs}
                this._attributesApiService.saveAttributeSequences(data).then(
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
