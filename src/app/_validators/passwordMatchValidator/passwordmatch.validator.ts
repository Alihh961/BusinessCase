import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confPassword = control.get('confPassword')?.value;

  if(password === confPassword && password && confPassword){

    if(control.get("confPassword")?.hasError("toto") ){ // we check if the error exists we remove it
      control.get("confPassword")?.updateValueAndValidity();
    }
    return null;

  }else {

    //we add an error to the confPassword Abstract control because the validator is attached to the second face
    control.get('confPassword')?.setErrors({"toto" : true});
    return { passwordMatchError: true}
  }

};
