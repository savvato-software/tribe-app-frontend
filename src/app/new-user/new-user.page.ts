import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert/alert.service';
import { UserService } from '../_services/user/user.service';
import { ChallengeCodeService } from "../_services/challenge-code/challenge-code.service";
import { LoadingService } from "../_services/loading-spinner/loading.service";

import { CountryPhone } from '../_models/country-phone.model';
import { PhoneValidator } from '../validators/phone.validator';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {

  codeAlreadySent = false;
  user = {name: undefined, phone: undefined, email: undefined, password: undefined};

  validationsForm: FormGroup;
  countryPhoneGroup: FormGroup;

  countries: Array<CountryPhone>;

  constructor(private _location: Location,
              private _router: Router,
              private _route: ActivatedRoute,
              private _userService: UserService,
              private _alertService: AlertService,
              private _challengeCodeService: ChallengeCodeService,
              private _loadingService: LoadingService,
              private formBuilder: FormBuilder ) {

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
    this.ngOnInit();
  }

  onNameChange($event) {
    this.user['name'] = $event.currentTarget.value;
  }

  getName() {
    return this.user['name'];
  }

  onPhoneChange($event) {
    this.user['phone'] = $event.currentTarget.value;
  }

  getPhone() {
    return this.user['phone'];
  }

  onEmailChange($event) {
    this.user['email'] = $event.currentTarget.value;
  }

  getEmail() {
    return this.user['email'];
  }

  onPasswordChange($event) {
    this.user['password'] = $event.currentTarget.value;
  }

  getPassword() {
    return this.user['password'];
  }

  isSaveBtnEnabled() {
    let rtn = this.user['name'] && this.user['name'].length > 3;
    let atLeastOneFieldIsValid = false;

    if (this.user['phone']) {
      rtn = rtn &&
          this.validationsForm.get('countryPhone') !== null &&
          (!!this.validationsForm.get('countryPhone').errors === false) && this.user['phone'].length === 10;

      if (rtn) {
        atLeastOneFieldIsValid = true;
      }
    }

    if (this.user['email']) {
      rtn = rtn &&
          this.validationsForm.get('email') !== null &&
          (!!this.validationsForm.get('email').errors === false) && this.user['email'].length > 6;

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
      self._userService.isUserInformationUnique(self.user).then((userInfo) => {
        if (userInfo == true) {
          if (!self.codeAlreadySent) {
            self._alertService.show({
              header: 'Ready for a text?',
              message: "We're gonna send a text to your phone at " + self.user["phone"] + ". Okay?",
              buttons: [
                {
                  text: 'No', role: 'cancel', handler: () => {
                    // do nothing
                  },
                }, {
                  text: 'Yes', handler: () => {
                    self._challengeCodeService.sendCodeToPhoneNumber(self.user["phone"]);
                    self.codeAlreadySent = true;
                    self.onOKBtnTap2();
                  }, cssClass: 'e2e-sendCodeToPhoneNumberBtn'
                }]
            });
          } else {
            self.onOKBtnTap2();
          }
        } else {
          self._alertService.show({
            header: 'Doh!',
            message: "Sorry, that " + userInfo + " is already taken :(",
            buttons: [
              {
                text: 'OK', role: 'cancel', handler: () => {
                  self.codeAlreadySent = false;
                }
              }
            ]
          })
        }
      })
          .catch((err) => {
            self._alertService.show({
              header: 'Aargh',
              message: "We got an error. Please email info@votingapp.com about it. Our bad :(",
              buttons: [
                {
                  text: 'Shucks.', role: 'cancel', handler: () => {
                    self.codeAlreadySent = false;
                  },
                }]
            });
          })
    }
  }

  onOKBtnTap2() {
    let self = this;

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
          // self._challengeCodeService.sendCodeToPhoneNumber(self.user["phone"]);
          self.codeAlreadySent = false;
        }
      }, {
        text: 'Got it!',
        cssClass: 'e2e-submitChallengeCodeBtn',
        handler: (data) => {
          if (data.code !== undefined && data.code.length > 0) {

            self._challengeCodeService.isAValidSMSChallengeCode(self.user["phone"], data.code).then((isValidSMSCC) => {
                if (isValidSMSCC) {
                  self._loadingService.show({message: "...creating your account..."}).then(() => {

                    self._userService.save(self.user, data.code).then(() => {
                      self._loadingService.dismiss().then(() => {

                        self._alertService.show({
                          header: 'Alright!',
                          message: "Account Created.<br/>user: " + self.user["name"] + "<br/>pw: ..." + self.user["password"].substring(self.user["password"].length - 5) + "<br/><br/>Click OK to sign in.",
                          buttons: [{
                            text: 'OK',
                            cssClass: 'e2e-account-successfully-created-btn',
                            handler: () => {
                              self.codeAlreadySent = false;

                              self._location.back();
                            }
                            }]
                          })
                        })
                      });
                    })
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
          }}
        }]
    });
  }

  onCancelBtnClicked() {
    console.log('Cancel Btn Clicked!');
    this._router.navigate(['/login']);
  }
}
