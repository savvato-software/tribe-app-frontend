import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {ConnectionDetailsPage} from "./connection-details.page";
import {Constants} from "../../../_constants/constants"; // Import HttpClientTestingModule

describe('ConnectionDetailsPage', () => {
  let component: ConnectionDetailsPage;
  let fixture: ComponentFixture<ConnectionDetailsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionDetailsPage ],
      providers: [
        { provide: Constants, useClass: Constants }
      ],
      imports: [
        HttpClientTestingModule, // Use HttpClientTestingModule instead of HttpClientModule
        RouterTestingModule.withRoutes([]),
        IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectionDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
