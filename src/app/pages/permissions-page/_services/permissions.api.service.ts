import { Injectable } from '@angular/core';
import { JWTApiService } from '@savvato-software/savvato-javascript-services';
import { environment } from '../../../_environments/environment';
import { reject, resolve } from 'cypress/types/bluebird';

@Injectable({
  providedIn: 'root'
})
export class PermissionsApiService {

  constructor(private _apiService: JWTApiService) {

}

  getListOfRoles() {
    const url = environment.apiUrl + '/api/permissions/user-roles-list';

    const rtn = new Promise(
      (resolve, reject) => {
        this._apiService.get(url).subscribe(
            (_data) => {

                resolve(_data);
            }, (err) => {
                reject(err);
            });
    });

    return rtn;
  }

  getListOfAllUsers() {
    const url = environment.apiUrl + '/api/permissions/users';

    const rtn = new Promise(
      (resolve, reject) => {
          this._apiService.get(url).subscribe(
              (_data) => {

                  resolve(_data);
              }, (err) => {
                  reject(err);
              });
    });

    return rtn;
  }

  save1() {
    const url = environment.apiUrl + '/api/permissions';
    let changes = {id:2, roles:["test1", "test2", "test3"]}
    return new Promise(
      (resolve, reject) => {
        this._apiService.post(url, changes).subscribe(
          (_data) => {
            console.log('roles saved to server' + _data);
            resolve({ "successful": {status: true} });
          }, (err) => {
            console.log('API error');
            reject(err);
          });
      });
  }

  save(changes) {
    const url = environment.apiUrl + '/api/permissions';
    return new Promise(
      (resolve, reject) => {
        this._apiService.post(url, changes).subscribe(
          (_data) => {
            console.log('roles saved to server' + _data);
            resolve({ "successful": {status: true} });
            resolve({ "successful": _data });
          }, (err) => {
            console.log('API error');
            reject(err);
          });
      });

  }
 
  /*
  save(model) {
    const url = environment.apiUrl + '/api/attributes';
    let data = { 'adverb': model['inputAdverbTxt'], 'verb': model['inputVerbTxt'], 'preposition': model['inputPrepositionTxt'], 'noun': model['inputNounTxt'] };

    return new Promise(
        (resolve, reject) => {
            this._apiService.post(url, data).subscribe(
                (_data) => {
                    console.log('save attribute to server' + ' was successful --> ' + _data);
                    resolve({ "successful": {status: true} });
                    resolve({ "successful": _data });
                }, (err) => {
                    reject(err);
                });
        });
  }*/

}



