import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReviewAttributesPage } from './review-attributes.page';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import {SharedComponentsModule} from "../../_shared-components/shared-components/shared-components.module";
import {IonicModule} from "@ionic/angular";

import { Constants } from "../../_constants/constants";




describe('ReviewAttributesPage', () => {
  let component: ReviewAttributesPage;
  let fixture: ComponentFixture<ReviewAttributesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewAttributesPage ],
      imports: [ IonicModule.forRoot(), HttpClientModule, SharedComponentsModule, RouterTestingModule.withRoutes([])],
      providers: [{ provide: Constants, useClass: Constants }]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAttributesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
