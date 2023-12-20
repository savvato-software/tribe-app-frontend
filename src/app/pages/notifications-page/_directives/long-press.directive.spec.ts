import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LongPressDirective, longPressDuration } from './long-press.directive';
import { NotificationModelService } from '../_service/notifications.model.service';

class MockNotificationModelService {
  getNotifications() {
    return [];
  }
}

@Component({
  template: '<div appLongPress [notification]="mockNotification" (longPress)="onLongPress()"></div>'
})
class TestComponent {
  mockNotification = {};
  longPressTriggered = false;

  onLongPress() {
    this.longPressTriggered = true;
  }
}

describe('LongPressDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let directiveDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LongPressDirective, TestComponent],
      providers: [
        { provide: NotificationModelService, useClass: MockNotificationModelService }
      ]
    });

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    directiveDebugElement = fixture.debugElement.query(By.directive(LongPressDirective));
  });

  it('should create an instance', () => {
    expect(directiveDebugElement).toBeTruthy();
  });

  it('should handle long press and emit event', fakeAsync(() => {
    const directiveInstance = directiveDebugElement.injector.get(LongPressDirective);

    directiveDebugElement.triggerEventHandler('mousedown', { button: 0 });
    tick(longPressDuration - 1);
    directiveDebugElement.triggerEventHandler('mouseup', {});

    // Check expectations using if statements
    if (testComponent.longPressTriggered !== true) {
      throw new Error('Expected longPressTriggered to be true');
    }
  }));

  it('should reset state on mouse leave', fakeAsync(() => {
    const directiveInstance = directiveDebugElement.injector.get(LongPressDirective);

    directiveDebugElement.triggerEventHandler('mousedown', { button: 0 });
    tick(longPressDuration - 1);
    directiveDebugElement.triggerEventHandler('mouseleave', {});

    // Check expectations using if statements
    if (directiveInstance.isPressed !== false || directiveInstance.loadingBar !== false) {
      throw new Error('Expected isPressed and loadingBar to be false');
    }
  }));

  afterEach(() => {
    fixture.destroy();
  });
});