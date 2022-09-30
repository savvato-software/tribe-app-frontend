import { Injectable } from '@angular/core';

import { LoadingController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class LoadingService { 

	loading = []
	counter = -1;

	constructor(private _ctrl: LoadingController) {

	}

	async show(options, onDidDismissFunc = undefined) {
	    this.loading[++this.counter] = await this._ctrl.create(options)
	    
	    if (onDidDismissFunc)
	    	await this.loading[this.counter].onDidDismiss(onDidDismissFunc);

	    if (this.loading[this.counter])
			return await this.loading[this.counter].present();
	}

	async dismiss() {
		if (this.counter > -1) {
			this.loading[this.counter--].dismiss()
		} else {
			console.log("call to dismiss spinner, but none set");
		}
	}

}