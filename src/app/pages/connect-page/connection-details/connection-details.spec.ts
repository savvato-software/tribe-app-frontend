import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {ConnectionDetailsPage} from "./connection-details.page";
import {Constants} from "../../../_constants/constants"; // Import HttpClientTestingModule
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AuthService, JWTApiService } from '@savvato-software/savvato-javascript-services';
import { ConnectApiService } from '../_services/connect.api.service';
import { ConnectModelService } from '../_services/connect.model.service';

class MockConnectModelService {
  model :any[] = [
    {
      "connectionError": null,
      "connectionSuccess": true,
      "message": "",
      "to": {
        "userId": 11,
        "username": "testuser10",
        "userConnectionStatus": "requesting"
      }
    },
  ];

  getAllConnections() :any[] {
    return this.model;
  }

}

describe('ConnectionDetailsPage', () => {
  let component: ConnectionDetailsPage;
  let fixture: ComponentFixture<ConnectionDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionDetailsPage ],
      providers: [
        { provide: Constants, useClass: Constants },
        { provide: ConnectModelService, useClass: MockConnectModelService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              userId: 11
            })
          }
        }
      ],
      imports: [
        HttpClientTestingModule, // Use HttpClientTestingModule instead of HttpClientModule
        RouterTestingModule.withRoutes([]),
        IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectionDetailsPage);
    component = fixture.componentInstance;
    component.connectedWithUserId = 11;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
