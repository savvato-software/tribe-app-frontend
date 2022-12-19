import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.page.html',
  styleUrls: ['./attributes.page.scss'],
})
export class AttributesPage implements OnInit {

  // update the local value with the input that is typed in
  inputTxt:string = ''
  outputTxt:string = ''

  constructor() { }

  ngOnInit() {
  }

  // get the value from the input field
  onInputAdverbFieldChange($event) {
    this.inputTxt = $event.currentTarget.value
  }

  // click button to put value in the read only output field
  // use this value as your current state
  onInputAdverbButtonClick() {
    this.outputTxt = this.inputTxt
  }

  onInputVerbFieldChange($event) {
    this.inputTxt = $event.currentTarget.value
  }

  onInputVerbButtonClick() {
    this.outputTxt = this.inputTxt
  }

  onInputPrepositionFieldChange($event) {
    this.inputTxt = $event.currentTarget.value
  }

  onInputPrepositionButtonClick() {
    this.outputTxt = this.inputTxt
  }

  onInputNounFieldChange($event) {
    this.inputTxt = $event.currentTarget.value
  }

  onInputNounButtonClick() {
    this.outputTxt = this.inputTxt
  }

  // this is the current state of the output field
  getOutputValue() {
    return this.outputTxt
  }

  // need event handler for each button

  

}
