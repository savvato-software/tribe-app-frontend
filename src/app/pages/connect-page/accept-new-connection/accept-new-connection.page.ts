import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectModelService } from '../_services/connect.model.service';

@Component({
  selector: 'app-accept-new-connection',
  templateUrl: './accept-new-connection.page.html',
  styleUrls: ['./accept-new-connection.page.scss'],
})
export class AcceptNewConnectionPage implements OnInit {

  headerPageTitle: string = 'Accept New Connection';
  headerPageSecondaryActionButtonText: string = 'Cancel';

  // pull date for QR code
  qrData: any = null;

  constructor(private _connectModelService: ConnectModelService,
              private router: Router) { }


  ngOnInit() {
      this._connectModelService.fetchQRCodeData().then(
          data => {
              console.log('QR code data', data);
              this.qrData = data.toString();
          }
      ).catch(
          error => {
              console.error('Error fetching QR code data', error);
          }
      );
  }

  isQRDataAvailable() {
      return this.qrData !== null;
  }

  getQRData() {
      return this.qrData;
  }

  onCancelBtnClick() {
      this.navigateTo('connect');
  }

  getCancelBtnClickFunc() {
      const self = this;
      return () => {
        self.navigateTo('connect');
      }
  }

    navigateTo(url?: string) {
      url = url || 'nav';
      this.router.navigate([url], { replaceUrl: true });
    }

}
