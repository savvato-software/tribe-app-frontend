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
  onInputOneFieldChange($event) {
    this.inputTxt = $event.currentTarget.value
  }

  // click button to put value in the read only output field
  // use this value as your current state
  onInputOneButtonClick() {
    this.outputTxt = this.inputTxt
  }

  onInputTwoFieldChange($event) {
    this.inputTxt = $event.currentTarget.value
  }

  onInputTwoButtonClick() {
    this.outputTxt = this.inputTxt
  }

  onInputThreeFieldChange($event) {
    this.inputTxt = $event.currentTarget.value
  }

  onInputThreeButtonClick() {
    this.outputTxt = this.inputTxt
  }

  onInputFourFieldChange($event) {
    this.inputTxt = $event.currentTarget.value
  }

  onInputFourButtonClick() {
    this.outputTxt = this.inputTxt
  }

  // this is the current state of the output field
  getOutputValue() {
    return this.outputTxt
  }

  // need event handler for each button

  

}
