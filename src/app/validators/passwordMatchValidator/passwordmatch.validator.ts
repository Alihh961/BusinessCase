import {FormGroup} from "@angular/forms";


export function PasswordmatchValidator(password :string , confPassword :string){

return (formGroup : FormGroup)=>{
  const passwordControl = formGroup.controls[password];
  const confPasswordControl = formGroup.controls[confPassword];
// && !confPasswordControl.errors.passwordmatchValidator
  if(confPasswordControl.errors){
    return;
  }else if(passwordControl.value !== confPasswordControl.value){
    return confPasswordControl.setErrors({passwordMatchs :true})
  }else{
    return confPasswordControl.setErrors(null);
  }
}

}
