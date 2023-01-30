import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.page.html',
  styleUrls: ['./attributes.page.scss'],
})
export class AttributesPage implements OnInit {

  // update the local value with the input that is typed in
  inputAdverbTxt:string = ''
  inputVerbTxt:string = ''
  inputPrepositionTxt:string = ''
  inputNounTxt:string = ''
  outputTxt:string = ''

  constructor() { }

  ngOnInit() {
  }

  // get the value from the input field
  onInputAdverbFieldChange($event) {
    this.inputAdverbTxt = $event.currentTarget.value
  }

  // click button to put value in the read only output field
  // use this value as your current state
  onInputAdverbButtonClick() {
    this.outputTxt = this.inputAdverbTxt
  }

  onInputVerbFieldChange($event) {
    this.inputVerbTxt = $event.currentTarget.value
  }

  onInputVerbButtonClick() {
    this.outputTxt = this.inputVerbTxt
  }

  onInputPrepositionFieldChange($event) {
    this.inputPrepositionTxt = $event.currentTarget.value
  }

  onInputPrepositionButtonClick() {
    this.outputTxt = this.inputPrepositionTxt
  }

  onInputNounFieldChange($event) {
    this.inputNounTxt = $event.currentTarget.value
  }

  onInputNounButtonClick() {
    this.outputTxt = this.inputNounTxt
  }

  // this is the current state of the output field
  getOutputValue() {
    return this.outputTxt
  }

}
