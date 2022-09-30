import { AbstractControl, ValidatorFn } from '@angular/forms';
import libphonenumber from 'google-libphonenumber';

export class PhoneValidator {

  // Inspired on: https://github.com/yuyang041060120/ng2-validation/blob/master/src/equal-to/validator.ts
  static validCountryPhone = (countryControl: AbstractControl): ValidatorFn => {
    let subscribe = false;

    return (phoneControl: AbstractControl): {[key: string]: boolean} => {
      if (!subscribe) {
        subscribe = true;
        countryControl.valueChanges.subscribe(() => {
          phoneControl.updateValueAndValidity();
        });
      }

      if(phoneControl.value !== ''){
        try{
          const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
          const phoneNumber = '' + phoneControl.value + '';
          const region = countryControl.value.iso;
          const phnumber = phoneUtil.parse(phoneNumber, region);
          const isValidNumber = phoneUtil.isValidNumber(phnumber);

          if(isValidNumber){
            console.log("isValidNumber is true, returning null")
            return null;
          }
        }catch(e){
          console.log("EXCEPTION!            " + e);
        }

        console.log("The text is not a valid number, but no exception was thrown. So returning data object with validCountryPhone: true")
        return {
          validCountryPhone: true
        };
      }
      else{
        console.log("phoneCtrl.value == '', so returning null")
        return null;
      }
    };
  };
}
