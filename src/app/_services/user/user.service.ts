import { Injectable } from '@angular/core';
import { JWTApiService } from '@savvato-software/savvato-javascript-services';

import { environment } from '../../_environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _apiService: JWTApiService) {

  }

  createNewUser(name, phone, email, password) {
  	const url = environment.apiUrl + '/api/public/user/new';
    let data = {'name': name};

  	if (phone) {
  		data['phone'] = phone;
  	}

  	if (email) {
		data['email'] = email;
  	}

  	if (password) {
	  data['password'] = password;
  	}

	const rtn = new Promise(
		(resolve, reject) => {
			this._apiService.postUnsecuredAPI_w_body(url, data).subscribe(
				(_data) => {
					console.log('New Account Saved!');
					console.log(_data);

					resolve(_data);
				}, (err) => {
					reject(err);
				});
		});

	return rtn;
  }

	isUserInformationUnique(user) {
		const self = this;
		const url = environment.apiUrl + "/api/public/user/isUserInformationUnique?name=" + user["name"] + "&email=" + user["email"] + "&phone=" + user["phone"];

		return new Promise(
			(resolve, reject) => {
				this._apiService.getUnsecuredAPI(url).subscribe(
					(data) => {
						resolve(data["response"]);
					}, (err) => {
						reject(err);
					})
			});
	}

	save(user, code?) {
		let self = this;
		let url = environment.apiUrl + "/api/public/user/new";

		let data = {};

		if (user.name && user.password) {
			data['name'] = user.name;
			data['password'] = user.password;
		}

		if (user.email)
			data['email'] = user.email;

		if (user.phone)
			data['phone'] = user.phone;

		if (code !== undefined) {
			data['newUserRegistrationCode'] = code;
		}

		return new Promise(
			(resolve, reject) => {
				this._apiService.postUnsecuredAPI_w_body(url, data).subscribe(
					(userId) => {
						console.log("Credentials Saved! " + JSON.stringify(data));
						resolve(userId);
					}, (err) => {
						reject(err);
					});
			});
	}

	isPhoneNumberAvailable(phone) {
		return this.isUserObjectAttributeAvailable("isPhoneNumberAvailable", phone);
	}

	isUserObjectAttributeAvailable(apiMethod, value) {
		let self = this;
		let url = environment.apiUrl + "/api/public/user/" + apiMethod + "?q=" + value;

		return new Promise(
			(resolve, reject) => {
				this._apiService.getUnsecuredAPI(url).subscribe(
					(data) => {
						resolve(data);
					}, (err) => {
						reject(err);
					})
			});
	}

	changePassword(smsChallengeCode, phoneNumber, newPassword) {

		let rtn = new Promise((resolve, reject) => {
			let self = this;
			let url = environment.apiUrl + "/api/public/user/changePassword";

			let data = {smsChallengeCode: smsChallengeCode, phoneNumber: phoneNumber, pw: newPassword}

			self._apiService.postUnsecuredAPI_w_body(url, data).subscribe((resp) => {
				resolve(resp);
			}, (err) => {
				console.log(JSON.stringify(err));
				reject(err);
			});
		});

		return rtn;
	}
}
