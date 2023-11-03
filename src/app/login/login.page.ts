import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '@savvato-software/savvato-javascript-services';

import { environment } from "../_environments/environment";

import { AlertService } from "../_services/alert/alert.service";
import {LoadingService} from "../_services/loading-spinner/loading.service";
import {UserService} from "../_services/user/user.service";
import {ChallengeCodeService} from "../_services/challenge-code/challenge-code.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  emailaddress = undefined;
  password = undefined;

  validationsForm: FormGroup;

  constructor(private loginService: LoginService,
              private _router: Router,
              private formBuilder: FormBuilder,
              private _alertService: AlertService,
              private _userService: UserService,
              private _loadingService: LoadingService,
              private _challengeCodeService: ChallengeCodeService) {

  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  validationMessages = {
    emailaddress: [
      { type: 'required', message: 'Email address is required.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' }
    ]
  };

  ngOnInit() {

    if (!environment.production) {
      if(localStorage.getItem("emailaddress") === null){
        this.emailaddress = "testuser@tribeapp.com";
        this.password = "admin";
      } else {
        this.emailaddress = localStorage.getItem("emailaddress");
        this.password = localStorage.getItem("password");
      }
      
    } else {
      this.emailaddress = '';
      this.password = '';
    }

    this.validationsForm = this.formBuilder.group({
      emailaddress: new FormControl(this.emailaddress, Validators.required),
      password: new FormControl(this.password, Validators.required)
    });
  }

  onEmailAddressChange($event) {
    this.emailaddress = $event.currentTarget.value;
  }

  onPasswordChange($event) {
    this.password = $event.currentTarget.value;
  }

  onSubmitClick(evt) {
    const self = this;

    this._loadingService.show({message: "..logging in.."}).then(() => {
      this.loginService.login(environment, this.emailaddress, this.password).then(
          (response) => {
            localStorage.setItem("emailaddress", this.emailaddress);
            localStorage.setItem("password", this.password);
            this._loadingService.dismiss().then(() => {
              this._router.navigate(['/home']);
            })
          },
          (err) => {
            this._loadingService.dismiss().then(() => {
              self._alertService.show({
                header: 'Aaargh!',
                message: 'Sorry, we couldn\'t log you in :(',
                buttons: [
                  {
                    text: 'OK', role: 'cancel', handler: () => {
                      self._router.navigate(['/login']);
                    }
                  }
                ]
              })
            })
          })
    });
  }

  onLostPasswordClick(event) {
    let self = this;
    this._alertService.show({
      header: '',
      message: "Would you like to reset your password?",
      buttons: [{
        text: "Oops, no..",
        role: 'cancel'
      }, {
        text: 'Yes!',
        handler: () => {
          this.onResetPasswordClick();
        }
      }]
    })
  }

  onResetPasswordClick() {
    let self = this;
    this._alertService.show({
      header: "Enter your phone number. We'll send you a code.",
      inputs: [{
        name: 'phoneNumber',
        placeholder: '..10 digit phone number..',
        type: 'number'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Send Code',
        handler: (data) => {

          if (data.phoneNumber.length != 10)
            return false;

          self._userService.isPhoneNumberAvailable(data.phoneNumber).then((isAvailable) => {
            if (isAvailable) {

              self._alertService.show({
                header: 'Uh oh!',
                message: "We don't have an account with that phone number. :(",
                buttons: [{
                  text: "OK",
                  role: 'cancel'
                }]
              })
            } else {
              self._challengeCodeService.sendCodeToPhoneNumber(data.phoneNumber);
              // self.codeAlreadySent = true;

              this.onCodeSentToPhoneNumber(data.phoneNumber);
            }
          });
        }
      }]
    })
  }

  onCodeSentToPhoneNumber(phoneNumber) {
    let self = this;
    this._alertService.show({
      header: "What's in the text?",
      inputs: [{
        name: 'code',
        placeholder: '..code from text msg..',
        type: 'number'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Got it!',
        handler: (data) => {
          if (data.code !== undefined && data.code.length > 0) {

            self._challengeCodeService.isAValidSMSChallengeCode(phoneNumber, data.code).then((isValidSMSCC) => {
              if (isValidSMSCC) {

                // present dialog allowing user to enter new password

                self._alertService.show({
                  header: "Enter Your New Password",
                  inputs: [{
                    name: 'pw1',
                    placeholder: '..new password..'
                  }, {
                    name: 'pw2',
                    placeholder: '..verify password..'
                  }],
                  buttons: [{
                    text: 'Cancel',
                    role: 'cancel'
                  }, {
                    text: 'OK',
                    handler: (data2) => {
                      if (data2.pw1 && data2.pw1.length > 5 && data2.pw1 == data2.pw2) {
                        self._userService.changePassword(data.code, phoneNumber, data2.pw2).then((response) => {

                          if (response["body"]["id"]) {
                            self._alertService.show({
                              header: 'Yay!',
                              message: "Your password has been changed.<br/><br/>Username: " + response["body"]["name"],
                              buttons: [{
                                cssClass: 'finalOkBtn',
                                text: 'OK',
                                handler: () => {

                                }
                              }]
                            })
                          } else {
                            self._alertService.show({
                              header: 'Hmmm...!',
                              message: "Could not change your password... Try again.",
                              buttons: [{
                                text: 'OK',
                                handler: () => {

                                }
                              }]
                            })
                          }

                        }, (err) => {

                          self._alertService.show({
                            header: 'Arggh!',
                            message: "Something bad happened on the server. We hate when that happens. Please email us at info@tribeapp.com and let us know.",
                            buttons: [{
                              text: 'OK',
                              handler: () => {

                              }
                            }]
                          })
                        })
                      } else {
                        return false;
                      }
                    }
                  }]
                });

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
  }

  onCreateNewUserClick() {
    this._router.navigate(['/new-user']);
  }

  isSubmitBtnEnabled() {
    return this.emailaddress.length > 2 && this.password.length > 3;
  }

  getEmailAddress() {
    return this.emailaddress;
  }

  getPassword() {
    return this.password;
  }

}
