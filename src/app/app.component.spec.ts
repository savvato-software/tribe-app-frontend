import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from "@savvato-software/savvato-javascript-services";

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ RouterTestingModule.withRoutes([])],
      providers: [AuthService]
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have correct number of menu labels when not logged in', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(1);
  }));

  xit('should have correct number of menu labels when logged in is true', waitForAsync(() => {

    // TODO: Supply mock for authService to test menu labels when user is logged in

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(1);
    // expect(menuItems[0].textContent).toContain('Inbox');
    // expect(menuItems[1].textContent).toContain('Outbox');
  }));

  it('should have urls', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(2);
    // expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/folder/Inbox');
    // expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/folder/Outbox');
  }));

});
