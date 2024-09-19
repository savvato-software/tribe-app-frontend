import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcceptNewConnectionPage } from './accept-new-connection.page';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { Constants } from '../../../_constants/constants';
import {SharedComponentsModule} from "../../../_shared-components/shared-components/shared-components.module";
import {AuthService} from "@savvato-software/savvato-javascript-services";
import {ConnectApiService} from "../_services/connect.api.service";
import {QRCodeModule} from "angularx-qrcode";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

describe('AcceptNewConnectionPage', () => {
  let component: AcceptNewConnectionPage;
  let fixture: ComponentFixture<AcceptNewConnectionPage>;

  beforeEach(waitForAsync(() => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['getUser', 'getToken']);
    const connectApiServiceMock = jasmine.createSpyObj('ConnectApiService', ['getAllConnections', 'getQRCodeData']);

    TestBed.configureTestingModule({
      declarations: [ AcceptNewConnectionPage ],
      providers: [
        { provide: Constants, useClass: Constants },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ConnectApiService, useValue: connectApiServiceMock }
      ],
      imports: [HttpClientModule, SharedComponentsModule, FormsModule, CommonModule,
                RouterTestingModule.withRoutes([]), IonicModule.forRoot(),
                QRCodeModule]
    }).compileComponents();


    fixture = TestBed.createComponent(AcceptNewConnectionPage);
    component = fixture.componentInstance;

    authServiceMock.getUser.and.returnValue({id: 12345, name: 'Test User', enabled: 1});
    authServiceMock.getToken.and.returnValue('testtoken');

    connectApiServiceMock.getQRCodeData.and.returnValue(new Promise((resolve, reject) => {
        resolve('qrcodedata1X2Y3Z');
    }));

    fixture.detectChanges();
  }));

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
