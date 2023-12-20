import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { NotificationModelService } from '../_service/notifications.model.service';


export const longPressDuration = 1200; // Set the long press duration in milliseconds

const loadingBarDelay = 200; // Set the delay for loading bar appearance in milliseconds

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective {
  @Output() longPress = new EventEmitter();
  @Input() notification: any;

  private startTime: number;
  private loadingBarTimeout: any;
  private longPressTimeout: any;
  private currentNotification: any;
  public progress = this.notifications.progress;
  
  constructor(private notificationModelService: NotificationModelService) {
  }
  
  get notifications() {
    return this.notificationModelService.getNotifications();
  }

  @HostBinding('class.long-press') isPressed = false;
  @HostBinding('class.loading-bar') loadingBar = false;

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    this.isPressed = true;
    this.startTime = Date.now();
    this.currentNotification = this.notification;

    console.log('Starting progress:', this.currentNotification.progress);

    this.loadingBarTimeout = setTimeout(() => {
      if (this.isPressed && this.currentNotification) {
        this.loadingBar = true;

        const progressIncrement = 0.01; // Adjust as needed
        const updateInterval = 5; // Adjust as needed

        const updateProgress = () => {
          if (!this.currentNotification) {
            return; // Skip if currentNotification is null
          }
        
          if (!this.isPressed || !this.loadingBar) {
            console.log('Ending progress:', this.currentNotification.progress);
            return; // Stop progress if not pressed or loadingBar is false
          }
        
          this.currentNotification.progress += progressIncrement;
        
          if (this.currentNotification.progress > 1) {
            this.currentNotification.progress = 1;
          }
        
          setTimeout(updateProgress, updateInterval);
        };
        

        updateProgress();
      }
    }, loadingBarDelay);

    this.longPressTimeout = setTimeout(() => {
      if (this.isPressed) {
        this.longPress.emit();
        this.resetState();
      }
    }, longPressDuration);
  }

  @HostListener('mouseup') onMouseUp() {
    this.emitOrReset();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.emitOrReset();
  }

  private emitOrReset() {
    clearTimeout(this.loadingBarTimeout);
    clearTimeout(this.longPressTimeout);

    if (this.isPressed && this.loadingBar) {
      const elapsed = Date.now() - this.startTime;
      if (elapsed >= longPressDuration) {
        this.longPress.emit();
      }
    }

    this.resetState();
  }

  private resetState() {
    this.isPressed = false;
    this.loadingBar = false;
    if (this.currentNotification) {
      this.currentNotification.progress = 0;
      console.log('Ending progress:', this.currentNotification.progress);
      this.currentNotification = null;
    }
  }
}
