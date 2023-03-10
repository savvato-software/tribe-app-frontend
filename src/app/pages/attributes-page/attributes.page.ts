import { Component, OnInit, Output } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../_services/alert/alert.service';
import { UserService } from '../../_services/user/user.service';
import { LoadingService } from "../../_services/loading-spinner/loading.service";
import { AttributesModelService } from "./_services/attributes.model.service";

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.page.html',
  styleUrls: ['./attributes.page.scss'],
})
export class AttributesPage implements OnInit {

  // update the local value with the input that is typed in
  inputAdverbTxt: string = ''
  inputVerbTxt: string = ''
  inputPrepositionTxt: string = ''
  inputNounTxt: string = ''
  outputTxt: string = ''

  phrase = {};
  model = {};

  constructor(private _http: HttpClient,
    private _userService: UserService,
    private _alertService: AlertService,
    private _loadingService: LoadingService,
    private _attributesModelService: AttributesModelService,) { }

  ngOnInit() {
  }

  // get the value from the input field
  onInputAdverbFieldChange($event) {
    this.inputAdverbTxt = $event.currentTarget.value
    // this.phrase["inputAdverbTxt"] = $event.currentTarget.value;
  }

  // click button to put value in the read only output field
  // use this value as your current state
  onInputAdverbButtonClick() {
    this.outputTxt = this.inputAdverbTxt
  }

  onInputVerbFieldChange($event) {
    this.inputVerbTxt = $event.currentTarget.value
    // this.phrase["inputVerbTxt"] = $event.currentTarget.value;
  }

  onInputVerbButtonClick() {
    this.outputTxt = this.inputVerbTxt
  }

  onInputPrepositionFieldChange($event) {
    this.inputPrepositionTxt = $event.currentTarget.value
    // this.phrase["inputPrepositionTxt"] = $event.currentTarget.value;
  }

  onInputPrepositionButtonClick() {
    this.outputTxt = this.inputPrepositionTxt
  }

  onInputNounFieldChange($event) {
    this.inputNounTxt = $event.currentTarget.value
    // this.phrase["inputNounTxt"] = $event.currentTarget.value;
  }

  onInputNounButtonClick() {
    this.outputTxt = this.inputNounTxt
  }

  // this is the current state of the output field
  getOutputValue() {
    return this.outputTxt
  }

  /**POST is used to create a resource: The POST method is used to request that the origin server accept the entity enclosed in the request as a new subordinate of the resource 
 * identified by the Request-URI in the Request-Line. 
 * 
 * PUT is used to create or replace a resource: The PUT method requests that the enclosed entity be stored under the supplied Request-URI. 
 * If the Request-URI refers to an already existing resource, the enclosed entity SHOULD be considered as a modified version of the one residing on the origin server. 
 * If the Request-URI does not point to an existing resource, and that URI is capable of being defined as a new resource by the requesting user agent, the origin server 
 * can create the resource with that URI.
 * 
 * 
 * 
 *   
tribe-app-frontend/src/app/pages/profile-page/_services/profile.api.service.ts 
    save(model) {
        const url = environment.apiUrl + '/api/profile/' + model['userId'];
        let data = {'id': model['userId'], 'name': model['name'], 'email': model['email'], 'phone': model['phone']};

        return new Promise(
            (resolve, reject) => {
                this._apiService.put(url, data).subscribe(
                    (_data) => {
                        console.log('save profile ' + model['id'] + ' was successful --> ' +_data);

                        resolve({"successful": _data});
                    }, (err) => {
                        reject(err);
                    });
            });
    }

tribe-app-frontend/src/app/_services/picture/picture.service.ts
    save(photoType, model) {
    let self = this;

    return new Promise((resolve, reject) => {

      const uploadImageToAPI = async () => {
        const blob = await fetch(model["imageWebPath"]).then(r => r.blob());

        const formData = new FormData();
        formData.append('file', blob, model["imageWebPath"]);

        const url = environment.apiUrl + "/api/resource/" + photoType + "/" + model["id"];

        self._apiService.post(url, formData)
            .subscribe(res => {
              if (res['msg'] === 'ok') {
                resolve(true);
              } else {
                reject("error posting image to server");
              }
            });
      };

      uploadImageToAPI();
    })

 */


  // Taken from  tribe-app-frontend/blob/develop/src/app/pages/profile-page/edit/edit.ts/doTheSaveFunc() 
  applyPhraseToUser(){ //Change the method called in the html
    const self = this;
    let msg = 'Saving your attributes!';

    let model =  this.model; //Should I do have model or phrase? What is model referring to? Need to add model = {} or phrase = {} at the top;
    //let phrase = this.phrase;

    /**Model is inherited from the DomainObjectPage and defined by the getModelFunc: () => this.model in the constructor of the edit class, is this method overridden/ changes the context?
     * in DomainObjectPage
     * objectMap = undefined;
     * constructor(objectInitMap) {
            this.objectMap = objectInitMap; // What is the objectInitMap when I create a new DomainObjectPage object?
        }
     * 
     *  this.objectMap["getModelFunc"]()["image"];// How does this work?
     *      getModelFunc: () => {
     *          image: ,
     *          isImageChanged: ,
     *          imageWebPath,
     *          etc...
     *      } 
     *    OR
     *  getModelFunc: {
     *          image: ,
     *          isImageChanged: ,
     *          imageWebPath,
     *          etc...
     * }
     * 
     * Should I also have this page inherit from DomainObjectPage? No I need to create something like this from DomainObjectPage but for a phrase... I think...
     *    self.objectMap["getModelFunc"]()["image"] = id;
          self.objectMap["getModelFunc"]()["imageWebPath"] = webPath;
          self.objectMap["getModelFunc"]()["isImageChanged"] = true;
     * POSSIBLE PATH
          1) Define phrase = {};
          2) Initialized phrase['elements'] in the methods above
          3) phrase["inputAdverbTxt"] = $event.currentTarget.value;

    */

    self._loadingService.show({message: msg}).then(() => {

        self._attributesModelService.save(this.model).then(() => { // What am I passing to the save() as a param? this.phrase?
            self._loadingService.dismiss().then(() => { /* Since there's self and 'this' that means that the context of  the 'this' 
                                                        has changed to the object self._loadingService.show({message: msg}) returns? Do I need to do this loading service too?*/
                self._alertService.show({
                    header: 'Alright!',
                    message: "Success! Phrase Added!",
                    buttons: [{
                        text: 'OK', //role: 'cancel', // Taken from pages/profile-page/edit/edit.ts
                        handler: () => {
                            //this._router.navigate(['/attributes']);
                        }
                    }]
                })
            })
        });
    })
  }


}
