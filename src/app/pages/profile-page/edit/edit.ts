import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ActionSheetController } from '@ionic/angular';
import { CameraService } from '../../../_services/camera/camera.service';

import {HttpClient} from '@angular/common/http';

import {AuthService} from "@savvato-software/savvato-javascript-services";
import { ProfileModelService } from "../_services/profile.model.service";
import { AlertService } from '../../../_services/alert/alert.service'
import { UserService } from '../../../_services/user/user.service';
import { ChallengeCodeService } from "../../../_services/challenge-code/challenge-code.service";
import { LoadingService } from "../../../_services/loading-spinner/loading.service";
import { PictureService } from "../../../_services/picture/picture.service";

import { CountryPhone } from '../../../_models/country-phone.model';
import { PhoneValidator } from '../../../validators/phone.validator';

import { Constants } from '../../../_constants/constants'

import { ChoosePhotoSourcePage } from "../../_common/choose-photo-source/choose-photo-source";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {DomainObjectPage} from "../../_common/domain-object/domain-object.page";

@Component({
    selector: 'profile-edit',
    templateUrl: './edit.html',
    styleUrls: ['./edit.scss']
})
export class EditProfilePage extends DomainObjectPage implements OnInit
{

    headerPageTitle: string = "Edit Profile";
    headerPageSecondaryActionButtonText: string = 'Cancel';

    codeAlreadySent = false;
    model = {};

    validationsForm: FormGroup;
    countryPhoneGroup: FormGroup;

    countries: Array<CountryPhone>;

    dirty: boolean;

    constructor(private _location: Location,
                private _router: Router,
                private _route: ActivatedRoute,
                private _userService: UserService,
                private _authService: AuthService,
                private _alertService: AlertService,
                private _challengeCodeService: ChallengeCodeService,
                private _profileModelService: ProfileModelService,
                private _pictureService: PictureService,
                private _loadingService: LoadingService,
                private _constants: Constants,
                private formBuilder: FormBuilder,
                private _actionSheetController: ActionSheetController,
                private _cameraService: CameraService,
                private _http: HttpClient) {

        super({
            getModelFunc: () => this.model,
            _http: _http,
            actionSheetController: _actionSheetController,
            cameraService: _cameraService,
            _alertService: _alertService,
            _pictureService: _pictureService,
            photoType: _constants.PHOTO_TYPE_PROFILE
        })

        this.validationsForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.required),
            countryPhone: this.countryPhoneGroup
        });
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    validationMessages = {
        name: [
            { type: 'required', message: 'Name is required.' }
        ],
        email: [
            { type: 'required', message: 'Email is required.' },
            { type: 'pattern', message: 'Please enter a valid email.' }
        ],
        password: [
            { type: 'required', message: 'Password is required.' }
        ],
        phone: [
            { type: 'required', message: 'Phone is required.' },
            { type: 'validCountryPhone', message: 'Not a valid phone number.' }
        ]
    };

    ngOnInit() {
        console.log("** We're in ngOnInit for profile edit page")
        this.countries = [
            new CountryPhone('US', 'United States')
        ];

        const country = new FormControl(this.countries[0], Validators.required);
        const phone = new FormControl('', Validators.compose([
            PhoneValidator.validCountryPhone(country)
        ]));
        this.countryPhoneGroup = new FormGroup({
            country,
            phone
        });

        this.validationsForm = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.required),
            countryPhone: this.countryPhoneGroup
        });
    }

    ionViewWillEnter() {
        console.log("YO! We're in ioViewWillEnter!")

        this._profileModelService.init(this._authService.getUser()['id']).then((model) => {
            this.model = Object.assign({}, model);
        })

        this.dirty = false;
    }

    onNameChange($event) {
        this.model['name'] = $event.currentTarget.value;
        this.dirty = true;
    }

    getName() {
        return this.model['name'];
    }

    onPhoneChange($event) {
        this.model['phone'] = $event.currentTarget.value;
        this.dirty = true;
    }

    isPhoneChanged() {
        return this._profileModelService.get()['phone'] != this.model['phone'];
    }

    getPhone() {
        return this.model['phone'];
    }

    onEmailChange($event) {
        this.model['email'] = $event.currentTarget.value;
        this.dirty = true;
    }

    getEmail() {
        return this.model['email'];
    }

    onPasswordChange($event) {
        this.model['password'] = $event.currentTarget.value;
        this.dirty = true;
    }

    isPasswordChanged() {
        return this._profileModelService.get()['password'] != this.model['password'];
    }

    getPassword() {
        return this.model['password'];
    }

    isSaveBtnEnabled() {
        let rtn = this.dirty && this.model['name'] && this.model['name'].length > 3;
        let atLeastOneFieldIsValid = false;

        if (this.model['phone']) {
            rtn = rtn &&
                this.validationsForm.get('countryPhone') !== null &&
                (!!this.validationsForm.get('countryPhone').errors === false) && this.model['phone'].length === 10;

            if (rtn) {
                atLeastOneFieldIsValid = true;
            }
        }

         if (this.model['password']) {
            rtn = rtn &&
                this.validationsForm.get('password') !== null &&
                (!!this.validationsForm.get('password').errors === false) && this.model['password'].length > 5;

            if (rtn) {
                atLeastOneFieldIsValid = true;
            }
        }

        if (this.model['email']) {
            rtn = rtn &&
                this.validationsForm.get('email') !== null &&
                (!!this.validationsForm.get('email').errors === false) && this.model['email'].length > 6;

            if (rtn) {
                atLeastOneFieldIsValid = true;
            }
        }

        return rtn && atLeastOneFieldIsValid;
    }

    onSaveBtnClicked() {
        console.log('Save Btn Clicked!');

        const self = this;

        const DEFAULT_PASSWORD = 'password11';

        if (self.isSaveBtnEnabled()) {
            if (self.isPhoneChanged || self.isPasswordChanged()) {
                self._alertService.show({
                    header: 'Ready for a text?',
                    message: "Some information changed..<br/><br/>We're gonna send a text to your number at " + self.model["phone"] + ". Okay?",
                    buttons: [
                        {
                            text: 'No', role: 'cancel', handler: () => {
                                // do nothing
                            },
                        }, {
                            text: 'Yes', handler: () => {
                                self._challengeCodeService.sendCodeToPhoneNumber(self.model["phone"]);
                                self.codeAlreadySent = true;
                                self.onOKBtnTap2();
                            }, cssClass: 'e2e-sendCodeToPhoneNumberBtn'
                        }]
                });
            } else {
                self.onOKBtnTap2();
            }
        }
    }

    onOKBtnTap2() {
        let self = this;

        if (this.codeAlreadySent) {

            self._alertService.show({
                header: "What's in the text?",
                inputs: [{
                    name: 'code',
                    placeholder: '..code from text msg..',
                    type: 'number'
                }],
                buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        self.codeAlreadySent = false;
                    }
                }, {
                    text: 'Send Txt Again',
                    handler: () => {
                        self.codeAlreadySent = false;
                    }
                }, {
                    text: 'Got it!',
                    cssClass: 'e2e-submitChallengeCodeBtn',
                    handler: (data) => {
                        if (data.code !== undefined && data.code.length > 0) {

                                self._challengeCodeService.isAValidSMSChallengeCode(self.model["phone"], data.code).then((isValidSMSCC) => {
                                    if (isValidSMSCC) {
                                        self.doTheSaveFunc();
                                    } else {
                                        self._alertService.show({
                                            header: 'Aargh...',
                                            message: "That wasn't a valid code.......",
                                            buttons: [{
                                                text: 'Grr.',
                                                handler: () => {

                                                }
                                            }]
                                        })
                                    }
                                })
                        }
                    }
                }]
            });
        } else {
            self.doTheSaveFunc();
        }
    }

    doTheSaveFunc() {
        const self = this;
        const code = self.model["data.code"]
        const phoneNumber = self.model["phone"]
        const pw = self.model["password"]
        let msg = '';

        let model =  this.model;

        if (model['isImageChanged'] || model['isPhoneChanged'] || model['isPasswordChanged'])
            msg = "Saving your changes!";

        self._loadingService.show({message: msg}).then(() => {

            self._profileModelService.save(this.model).then(() => {
                if (model['isPasswordChanged'])
                        self._userService.changePassword(code, phoneNumber, pw).then(() => {
                            self._loadingService.dismiss().then(() => {

                                self._alertService.show({
                                    header: 'Alright!',
                                    message: "Changes saved!",
                                    buttons: [{
                                        text: 'OK',
                                        cssClass: 'e2e-changes-saved-btn',
                                        handler: () => {
                                            self.codeAlreadySent = false;
                                            self.navigateTo('/profile') ;
                                        }
                                    }]
                                })
                            })
                        });else {
                        self._loadingService.dismiss().then(() => {

                                self._alertService.show({
                                    header: 'Alright!',
                                    message: "Changes saved!",
                                    buttons: [{
                                        text: 'OK',
                                        cssClass: 'e2e-changes-saved-btn',
                                        handler: () => {
                                            self.codeAlreadySent = false;
                                            self.navigateTo('/profile') ;
                                        }
                                    }]
                                })
                        })
                    }
            });
        })
    }

    onCancelBtnClick() {
        console.log('Cancel Btn Clicked!');
        this._router.navigate(['/profile']);
    }

    getCancelBtnClickFunc() {
        const self = this;
        return () => {
          self.navigateTo('/profile');
        }
    }

    navigateTo(url?: string) {
        this._router.navigate([url], { replaceUrl: true });
    }
}