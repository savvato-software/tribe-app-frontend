import { Injectable } from '@angular/core';

import { AlertController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class AlertService { 

	constructor(private ctrl: AlertController) {

	}

	async show(options) {
	    const alert = await this.ctrl.create(options)

	    return await alert.present();
	}
}