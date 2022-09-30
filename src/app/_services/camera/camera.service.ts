import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera'

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() {

  }

  takePicture() {
    return new Promise((resolve, reject) => {
      const takePicture = async () => {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.Uri
        });

        console.log(image)
        console.log(JSON.stringify(image))

        // image.webPath will contain a path that can be set as an image src.
        // You can access the original file using image.path, which can be
        // passed to the Filesystem API to read the raw data of the image,
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        let imagePath = image.webPath;

        // Can be set to the src of an image now
        // imageElement.src = imageUrl;

        resolve({image: image, path: imagePath});
      };

      takePicture();

    })
  }

  loadGalleryPicture() {
    return new Promise((resolve, reject) => {
      const pickImage = async () => {
        const image = await Camera.pickImages({
          quality: 90
        });

        console.log(image)
        console.log(JSON.stringify(image))

        // image.webPath will contain a path that can be set as an image src.
        // You can access the original file using image.path, which can be
        // passed to the Filesystem API to read the raw data of the image,
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        let imagePath = image.photos[0].webPath;

        // Can be set to the src of an image now
        // imageElement.src = imageUrl;

        resolve({image: image, path: imagePath});
      };

      pickImage();
    });
  }
}
