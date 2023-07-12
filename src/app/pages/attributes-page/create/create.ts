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

    applyPhraseToUser(){ //Change the method called in the html
        const self = this;
        let msg = 'Saving your attributes!';

        self._loadingService.show({message: msg}).then(() => {

            self._attributesModelService.save(self.model).then(() => {
                self._loadingService.dismiss().then(() => {
                    self._alertService.show({
                        header: 'Alright!',
                        message: "Success! Phrase Added!",
                        buttons: [{
                            text: 'OK', role: 'cancel',
                            handler: () => {
                                //this._router.navigate(['/attributes']);
                            }
                        }]
                    })
                })
            });
        })
    }

    navigateTo(url?: string) {
        url = url || 'nav';
        this._router.navigate([url], { replaceUrl: true });
    }
}
