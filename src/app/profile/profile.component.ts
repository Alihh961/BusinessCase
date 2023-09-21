import {Component} from '@angular/core';
import {User} from "../_Interface/User";
import {UserService} from "../_services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../_services/profile/profile.service";
import Swal from 'sweetalert2';

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
    private fb: FormBuilder,
    private profileService : ProfileService
  ) {

    this.initEditForm();

  }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    // we use a subject behavior in the service so , it will send a value everytime the property changes in the service
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
      //
      // confNewPassword: ["", [
      //   Validators.required,
      //   Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")
      // ]]
    });
  }

  editProfileMethod() {

    let object = Object.assign({},{id : this.userService.getUserInfo()?.id} , this.editForm.value);
    console.log(object);
    this.profileService.updateUserInfo(object).subscribe(
      response=>{
        this.editForm.get("newPassword")?.reset();
        this.editForm.get("currentPassword")?.reset();

        Swal.fire(
          "success",
          response,
          "success"
        )
      },
      error=>{
        if(error.status == 500){
          error.error = "Internal Error , please again later!";
        }
        Swal.fire({
            title: "Error",
            text :error.error,
            icon :"error"
          }
        )
      }
    )

  }

}
