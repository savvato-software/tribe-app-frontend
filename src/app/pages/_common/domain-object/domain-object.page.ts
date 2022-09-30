import { Component, OnInit } from '@angular/core';
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-domain-object',
  templateUrl: './domain-object.page.html',
  styleUrls: ['./domain-object.page.scss'],
})
export class DomainObjectPage implements OnInit {

  objectMap = undefined;

  dirty = false;

  constructor(objectInitMap) {
    this.objectMap = objectInitMap;
  }

  ngOnInit() {

  }

  getAssociatedImage() {
    return this.objectMap["getModelFunc"]()["image"];
  }

  getAssociatedImageCSS() {
    return " centered ";
  }

  onAssociatedImageClick($event) {
    const self = this;

    self.presentActionSheet({
      callbackFunc: (pathAndSourceType) => {
        if (pathAndSourceType !== undefined) {
          let webPath = '';
          let imageFileSource = pathAndSourceType['imageFileSource'];
          if (imageFileSource === 'camera') {
            webPath = pathAndSourceType["image"]["webPath"]
          } else if (imageFileSource === 'gallery') {
            webPath = pathAndSourceType["image"]["photos"][0]["webPath"]
          } else {
            //
          }

          self.objectMap["_http"].get(webPath, {responseType: "blob"})
              .pipe(
                  switchMap(async (response: Blob) => Observable.create(obs => {
                    const reader = new FileReader();

                    reader.onerror = err => obs.error(err);
                    reader.onabort = err => obs.error(err);
                    reader.onload = () => obs.next(reader.result);
                    reader.onloadend = () => obs.complete();

                    return reader.readAsDataURL(response);
                  }))
              ).subscribe(
              (imgData) => {
                imgData.subscribe(
                    id => {
                      self.objectMap["getModelFunc"]()["image"] = id;
                      self.objectMap["getModelFunc"]()["imageWebPath"] = webPath;
                      self.objectMap["getModelFunc"]()["isImageChanged"] = true;
                      self.dirty = true;
                    })
              }
            )
          }
        }
      }
    )
  }

  onAssociatedImagePress($event) {
    let self = this;
    let _model = this.objectMap["getModelFunc"]();

    if (_model["imageWebPath"] && _model["imageWebPath"].indexOf("color-block") === -1) {
        this.objectMap["_alertService"].show({
            title: 'Delete Photo?',
            message: 'Do you want to DELETE this picture?',
            buttons: [
                {
                    text: 'No', role: 'cancel', handler: () => {
                        // do nothing
                    },
                }, {
                    text: 'Yes', handler: () => {
                        console.log('setting photo ' + _model["id"] + ' to be deleted from the server on save()');
                        self.objectMap["getModelFunc"]()["image"] = undefined;
                        self.objectMap["getModelFunc"]()["imageWebPath"] = undefined;
                        self.objectMap["getModelFunc"]()["isImageChanged"] = true;
                        self.objectMap["_pictureService"].reset(self.objectMap["photoType"], _model['id'])
                        self.objectMap["_pictureService"].setDefaultImageOnModel(_model);
                        self.dirty = true;
                    },
                }
            ]
            });
        }
    }

  async presentActionSheet(props) {

    const actionSheet = await this.objectMap["actionSheetController"].create({
      header: 'Which way to your new photo?',
      buttons: [{
        text: 'Camera',
        icon: 'camera-outline',
        data: 'camera',
      }, {
        text: 'Photo Gallery',
        icon: 'grid-outline',
        data: 'gallery',
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
      }]
    });

    await actionSheet.present();

    const { data } = await actionSheet.onDidDismiss();

    let returnData;

    switch (data) {
      case 'camera':
        await this.objectMap["cameraService"].takePicture().then((imageData) => {
          console.log("just took a picture. Its at " + imageData['path']);
          returnData = {imageFileSource: 'camera', image: imageData['image']};
        });
        break;
      case 'gallery':
        await this.objectMap["cameraService"].loadGalleryPicture().then((imageData) => {
          console.log("just set a picture from the gallery. Its at " + imageData['path']);
          returnData = {imageFileSource: 'gallery', image: imageData['image']};
        });
        break;
    }

    props.callbackFunc(returnData);

  }

}
