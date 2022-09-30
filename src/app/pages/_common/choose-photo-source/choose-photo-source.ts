import { Component, Input } from '@angular/core';

import { NavParams } from '@ionic/angular';

import { CameraService } from '../../../_services/camera/camera.service';

@Component({
  selector: 'page-choose-photo-source',
  templateUrl: 'choose-photo-source.html',
  styleUrls: ['./choose-photo-source.scss']
})

export class ChoosePhotoSourcePage {

	@Input() model: any;
	@Input() props: any;
	@Input() callbackFunc;

	constructor(private cameraService: CameraService,
				public params: NavParams) {

	}

	onCameraBtnTap(evt) {
		let self = this;
		
		self.cameraService.takePicture().then((imageData) => {
			console.log("just took a picture. Its at " + imageData['path']);
			self.callbackFunc({imageFileSource: 'gallery', image: imageData['image']});
		});
	}

	onGalleryBtnTap(evt) {
		let self = this;

		self.cameraService.loadGalleryPicture().then((imageData) => {
			console.log("just set a picture from the gallery. Its at " + imageData['path']);
			self.callbackFunc({imageFileSource: 'gallery', image: imageData['image']});
		});
	}

	onCancelBtnTap(evt) {
		this.callbackFunc();
	}
}
