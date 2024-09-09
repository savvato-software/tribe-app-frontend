import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";

import { AttributesPage } from './attributes.page';
import {HttpClientModule} from "@angular/common/http";

import { Constants } from '../../_constants/constants';
import {SharedComponentsModule} from "../../_shared-components/shared-components/shared-components.module";

describe('AttributesPage', () => {
  let component: AttributesPage;
  let fixture: ComponentFixture<AttributesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributesPage ],
      providers: [
        { provide: Constants, useClass: Constants }
      ],
      imports: [HttpClientModule, SharedComponentsModule, RouterTestingModule.withRoutes([]), IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AttributesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
