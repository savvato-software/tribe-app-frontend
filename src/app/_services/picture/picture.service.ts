import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';

import {HttpClient} from '@angular/common/http';

import {AuthService, FunctionPromiseService, JWTApiService} from '@savvato-software/savvato-javascript-services'

import {Constants} from '../../_constants/constants';

import {environment} from '../../_environments/environment';

// import {WebView} from '@ionic-native/ionic-webview/ngx';

import {DomSanitizer} from '@angular/platform-browser'
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  mostProbablePhotoPath = {};

  constructor(private _platform: Platform,
              private _http: HttpClient,
              private _apiService: JWTApiService,
              private _authService: AuthService,
              private _functionPromiseService: FunctionPromiseService,
              private _constants: Constants
   //           ,private _webview: WebView
              ,private _domSanitizer: DomSanitizer
              ) {

  }

  setLocalStorage(key, val) {
    localStorage.setItem(key, val);
  }

  getLocalStorage(key) {
    let rtn = +localStorage.getItem(key);
    return rtn;
  }

  getImageDataFromURL(url, func) {
    const self = this;
    self._http.get(url, {responseType: "blob"})
        .pipe(
            switchMap(async (response) => Observable.create(obs => {
              const reader = new FileReader();

              reader.onerror = err => obs.error(err);
              reader.onabort = err => obs.error(err);
              reader.onload = () => obs.next(reader.result);
              reader.onloadend = () => obs.complete();

              return reader.readAsDataURL(response);
            }))
        ).subscribe(func)
  }

  init() {

    let self = this;

    self._functionPromiseService.initFunc(self._constants.FUNCTION_KEY_PROFILE_PICTURE_GET, (data) => {

      const model = data["model"]
      const objId = model["id"];
      const photoType = data["photoType"];
      const photoSize = data["photoSize"];

      return new Promise((resolve, reject) => {

        // check the API, it returns the timestamp of the file it has.
        const url1 = environment.apiUrl + "/api/resource/" + photoType + "/" + objId + "/isFound";
        self._apiService.get(url1).subscribe((pictureAPITimestamp: number) => {

          let url = '';

          if (pictureAPITimestamp * 1 > 0) { // meaning, this file exists on the API
            url = environment.apiUrl + "/api/resource/" + photoType + "/" + objId + "?photoSize=" + photoSize;
          } else {
            url = '/assets/img/defaults/color-block-' + objId % 7 + '.jpg';
          }

          this.getImageDataFromURL(url, (imgData) => { resolve({imgData: imgData, url: url}); });
        })
      });
    });
  }

  setRandomDefaultImageOnModel(model) {
    const url = '/assets/img/defaults/color-block-' + Math.floor(Math.random() * 7) + '.jpg';
    return this.getImageDataFromURL(url, (imgData) => {
      imgData.subscribe(
          data => {
            model['image'] = data;
            model['imageWebPath'] = undefined;
          }
      )
    })
  }

  setDefaultImageOnModel(model) {
    const url = '/assets/img/defaults/color-block-' + model['id'] % 7 + '.jpg';
    this.getImageDataFromURL(url, (imgData) => {
      imgData.subscribe(
          data => {
            model['image'] = data;
            model['imageWebPath'] = undefined;
          }
      )
    })
  }

  reset(photoType, objId) {
    return this._functionPromiseService.reset(photoType+objId);
  }

  delete(photoType, model) {

    // delete the picture from the server, so other users won't see it either
    return new Promise((resolve, reject) => {
      let url = environment.apiUrl + "/api/resource/" + photoType + "/" + model['id'];
      this._apiService.delete(url, { }).subscribe((data) => {
        resolve(data);
      }, (err) => {
        reject(err);
      })
    });
  }

  save(photoType, model) {
    return new Promise(async (resolve, reject) => {
      const blob = await fetch(model["imageWebPath"]).then(r => r.blob());

      const formData = new FormData();
      formData.append('file', blob, model["imageWebPath"]);

      const url = environment.apiUrl + "/api/resource/" + photoType + "/" + model["id"];

      fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + this._authService.getToken()
        },
        body: formData
      })
          .then(response => response.json()) // Assuming the response is in JSON format
          .then(data => {
            if (data.msg === 'ok') {
              resolve(data); // Resolve the promise if the response message is 'ok'
            } else {
              reject(new Error('Server responded with an error: ' + data.msg));
            }
          })
          .catch(error => {
            reject(new Error('Network error or server is unreachable: ' + error.message));
          });
    });
  }

  getAssociatedImage(photoType, model, photoSize) {
    if (!photoType)
      throw new Error("The photoType has not been set.")

    let data = {photoType: photoType, model: model, photoSize: photoSize}
    return this._functionPromiseService.waitAndGet(photoType+model['id'], this._constants.FUNCTION_KEY_PROFILE_PICTURE_GET, data);
  }
}
