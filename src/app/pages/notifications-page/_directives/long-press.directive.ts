import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';


const longPressDuration = 1200; // Set the long press duration in milliseconds
const loadingBarDelay = 200; // Set the delay for loading bar appearance in milliseconds

@Directive({
  selector: '[appLongPress]'
})  

export class LongPressDirective {
  @Output() longPress = new EventEmitter();

  private startTime: number;
  private loadingBarTimeout: any;
  private longPressTimeout: any;


  @HostBinding('class.long-press') isPressed = false;
  @HostBinding('class.loading-bar') loadingBar = false;
  @HostBinding('class.loading-bar-text') loadingBarText = false;
  
  @HostListener('mousedown') onMouseDown() {
    this.isPressed = true;
    this.startTime = Date.now();


    this.loadingBarTimeout = setTimeout(() => {
      if (this.isPressed) {
        this.loadingBar = true; // Show loading bar after the delay
        this.loadingBarText = true
        console.log(this.loadingBarText)
        console.log("loading bar timer started")
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
    console.log("Put up or shut up")

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
    this.loadingBarText = false;
  }
}
