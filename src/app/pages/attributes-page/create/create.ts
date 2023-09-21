import {Component, OnInit} from "@angular/core";

import { Router} from "@angular/router";

import { AlertService } from '../../../_services/alert/alert.service';
import { UserService } from '../../../_services/user/user.service';
import { LoadingService } from "../../../_services/loading-spinner/loading.service";
import { AttributesModelService } from "../_services/attributes.model.service";

@Component({
    selector: 'attribute-create',
    templateUrl: './create.html',
    styleUrls: ['./create.scss']
})
export class CreateAttributePage implements OnInit
{

    headerPageTitle: string = 'Create Attribute';
    headerPageSecondaryActionButtonText: string = 'Cancel';

    // update the local value with the input that is typed in
    inputAdverbTxt: string = ''
    inputVerbTxt: string = ''
    inputPrepositionTxt: string = ''
    inputNounTxt: string = ''
    outputTxt: string = ''

    model = {};

    constructor(private _userService: UserService,
                private _alertService: AlertService,
                private _loadingService: LoadingService,
                private _attributesModelService: AttributesModelService,
                private _router: Router) {

    }

    public ngOnInit() {
        this._attributesModelService.init().then(() => {
        });
    }

    onCancelBtnClick() {
        this.navigateTo('attributes');
    }

    getCancelBtnClickFunc() {
        const self = this;
        return () => {
          self.navigateTo('attributes');
        }
    }

    // get the value from the input field
    onInputAdverbFieldChange($event) {
        this.inputAdverbTxt = $event.currentTarget.value
    }

    // click button to put value in the read only output field
    // use this value as your current state
    onInputAdverbButtonClick() {
        this.outputTxt = this.inputAdverbTxt
    }

    onInputVerbFieldChange($event) {
        this.inputVerbTxt = $event.currentTarget.value
    }

    onInputPrepositionFieldChange($event) {
        this.inputPrepositionTxt = $event.currentTarget.value
    }

    onInputNounFieldChange($event) {
        this.inputNounTxt = $event.currentTarget.value
    }

    applyPhraseToUser() {
        const self = this;
        const model:any = {
            "inputAdverbText": this.inputAdverbTxt,
            "inputVerbText": this.inputVerbTxt, 
            "inputPrepositionText": this.inputPrepositionTxt, 
            "inputNounText": this.inputNounTxt
        };
        let msg = 'Saving your attributes!';
        const attributeSet = new Set<string>();
    

        //Populate the attributeSet with the existing attributes
        const attributes = this._attributesModelService.get();
        attributes.forEach((attribute) => {
            const existingAttribute = `${attribute.phrase.adverb} ${attribute.phrase.verb} ${attribute.phrase.preposition} ${attribute.phrase.noun}`;
            attributeSet.add(existingAttribute.toLowerCase());
        });

        self._loadingService.show({ message: msg }).then(() => {
            
            self._loadingService.dismiss().then(() => {

                // Check if the entered attribute already exists in the model   
                const enteredAttribute = `${model.inputAdverbText} ${model.inputVerbText} ${model.inputPrepositionText} ${model.inputNounText}`;
                const attributeExists = attributeSet.has(enteredAttribute.toLowerCase());
        
                if (attributeExists) {
                    self._alertService.show({
                        header: 'Attribute Exists',
                        message: 'The attribute you entered already exists.',
                        buttons: [{
                            text: 'OK',
                            role: 'cancel',
                            handler: () => {
                                self.navigateTo('/attributes');
                            }
                        }]
                    });
                } else {
                    // Save the attribute if it doesn't already exist
                    self._attributesModelService.save(model).then((isPhraseReviewed: boolean) => {
                        let header = '';
                        let message = '';
        
                        switch (isPhraseReviewed) {
                            case true:
                                header = 'Success';
                                message = 'Attribute has been applied!';
                                break;
                            case false:
                                header = 'In Review';
                                message = 'We have not seen this attribute before, it is in review. We will add it to your profile once it is approved.';
                                break;
                        }
                        self._alertService.show({
                            header: header,
                            message: message,
                            buttons: [{
                                text: 'OK',
                                role: 'cancel',
                                handler: () => {
                                    self.navigateTo('/attributes');
                                }
                            }]
                        });
                    });
                }
            });
        });
        
    }
    

    navigateTo(url?: string) {
        url = url || 'nav';
        this._router.navigate([url], { replaceUrl: true });
    }
}
