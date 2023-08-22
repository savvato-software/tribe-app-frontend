import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReviewAttributesPage } from './review-attributes.page';
import { HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

describe('ReviewAttributesPage', () => {
  let component: ReviewAttributesPage;
  let fixture: ComponentFixture<ReviewAttributesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewAttributesPage ],
      imports: [ HttpClientModule, RouterTestingModule.withRoutes([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewAttributesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
