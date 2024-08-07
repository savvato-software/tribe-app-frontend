import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing"; // Import HttpClientTestingModule

import { ListConnectionsPage } from './list-connections.page';
import { Constants } from "../../../_constants/constants";

describe('ListConnectionsPage', () => {
  let component: ListConnectionsPage;
  let fixture: ComponentFixture<ListConnectionsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConnectionsPage ],
      providers: [
        { provide: Constants, useClass: Constants }
      ],
      imports: [
        HttpClientTestingModule, // Use HttpClientTestingModule instead of HttpClientModule
        RouterTestingModule.withRoutes([]),
        IonicModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListConnectionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
