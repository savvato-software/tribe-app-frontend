import { Injectable } from '@angular/core';
import {environment} from "../../_environments/environment";
import {JWTApiService} from "@savvato-software/savvato-javascript-services";

@Injectable({
  providedIn: 'root'
})
export class ChallengeCodeService {

  constructor(private _apiService: JWTApiService) {

  }

  //
  // We call an api, to send a code to a phone number.
  sendCodeToPhoneNumber(phoneNumber) {
    let url = environment.apiUrl + "/api/public/sendSMSChallengeCodeToPhoneNumber";

    // assume phoneNumber looks like '3035551212'
    let data = {"phoneNumber": phoneNumber};

    this._apiService.postUnsecuredAPI_w_body(url, data).subscribe(() => {
      console.log("Just requested an SMS challenge code be sent to " + phoneNumber);
    }, (err) => {
      console.log("UserService SendCodeToPhoneNumber ERROR");
      console.log(JSON.stringify(err));
    });
  }

  isAValidSMSChallengeCode(phoneNumber, code) {
    let data = {"code": code, "phoneNumber": phoneNumber};
    let url = environment.apiUrl + "/api/public/isAValidSMSChallengeCode";

    return new Promise(
        (resolve, reject) => {
          this._apiService.postUnsecuredAPI_w_body(url, data).subscribe(
              (b) => {
                resolve(b.body);
              }, (err) => {
                reject(err);
              });
        });
  }
}
