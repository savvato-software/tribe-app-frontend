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

  // making a rest api call
  // look at other code to see the api call
  // then use that to make a post call
  // good example would be login page
  // make it in a different branch
  // tribe 17
  // won't be able to make the call but put the code in place
  // actual backend is tribe 11 but don't need to worr about this now
  sendPostRequest() {
    // var headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );
    // const requestOptions({ headers: headers });

    // /*
    //   inputAdverbTxt:string = ''
    //   inputVerbTxt:string = ''
    //   inputPrepositionTxt:string = ''
    //   inputNounTxt:string = ''
    //   outputTxt:string = ''
    // */

    // let postData = {
    //         "adverb": this.inputAdverbTxt,
    //         "verb": this.inputVerbTxt,
    //         "preposition": this.inputPrepositionTxt,
    //         "noun": this.inputNounTxt
    // }

    // this.http.post("http://127.0.0.1:3000/", postData, requestOptions)
    //   .subscribe(data => {
    //     console.log(data['_body']);
    //    }, error => {
    //     console.log(error);
    //   });
  }

}
