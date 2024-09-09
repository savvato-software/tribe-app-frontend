import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePage } from './profile.page';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

import { Constants } from '../../_constants/constants';
import {SharedComponentsModule} from "../../_shared-components/shared-components/shared-components.module";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePage ],
      providers: [
        { provide: Constants, useClass: Constants }
      ],
      imports: [ IonicModule.forRoot(), CommonModule, HttpClientModule, SharedComponentsModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
