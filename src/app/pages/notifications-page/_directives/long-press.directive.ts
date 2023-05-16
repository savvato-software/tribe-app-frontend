import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective {
  @Output()
  longPress = new EventEmitter();

  private timeout: any;

  @HostBinding('class.long-press') isPressed = false;

  @HostListener('mousedown') onMouseDown() {
    console.log('mousedown');
    this.isPressed = true;
    this.timeout = setTimeout(() => {
      this.longPress.emit();
    }, 1000); // set the long press time to 1 second
  }

    @HostListener('mouseup') onMouseUp() {
      console.log('mouseup');
      this.isPressed = false;
      clearTimeout(this.timeout);
    }

    @HostListener('mouseleave') onMouseLeave() {
      console.log('mouseleave');
      this.isPressed = false;
      clearTimeout(this.timeout);
    }
}
