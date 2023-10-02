import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confPassword = control.get('confPassword')?.value;

  if(password === confPassword && password && confPassword){

    return null;

  }else {
    return { passwordMatchError: true}
  }

};
