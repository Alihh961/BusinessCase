import {AfterViewChecked, AfterViewInit, Component, OnChanges} from '@angular/core';
import {User} from "../Interface/User";
import {UserService} from "../services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {


  currentUser ?: User;
  editForm !: FormGroup;
  string: string = "Toto";

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {

    this.initEditForm();

  }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    // we use a subjectBehaivor in the service so it will send a value everytime the property changes in the service
    this.userService.loggedUser$.subscribe(
      (userInfo: User | undefined) => {
        if (userInfo) {
          this.currentUser = userInfo;
          this.editForm.get('firstName')?.setValue(this.currentUser.firstName);
          this.editForm.get('lastName')?.setValue(this.currentUser.lastName);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }



  initEditForm() {

    this.editForm = this.fb.group({
      firstName: ["", [
        Validators.required,
        Validators.pattern("^[a-zA-Z]+$")
      ]],

      lastName: ["", [
        Validators.pattern("^[a-zA-Z]+( [a-zA-Z]+)?( [a-zA-Z]+)?$"),
        Validators.required,
      ]],

      currentPassword: ["", [
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")
      ]],

      newPassword: ["", [
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"),
        Validators.required,
      ]],

      confNewPassword: ["", [
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")
      ]]
    });
  }

  editProfileMethod() {
    console.log(this.editForm?.value);
    console.log(this.currentUser);
  }

}
