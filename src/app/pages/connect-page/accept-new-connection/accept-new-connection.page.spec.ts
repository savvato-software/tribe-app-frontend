import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcceptNewConnectionPage } from './accept-new-connection.page';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { Constants } from '../../../_constants/constants';

describe('AcceptNewConnectionPage', () => {
  let component: AcceptNewConnectionPage;
  let fixture: ComponentFixture<AcceptNewConnectionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptNewConnectionPage ],
      providers: [
        { provide: Constants, useClass: Constants }
      ],
      imports: [HttpClientModule, RouterTestingModule.withRoutes([]), IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptNewConnectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
