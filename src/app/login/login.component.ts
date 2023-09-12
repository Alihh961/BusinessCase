import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {Feature, FeatureCollection, Iaddress} from '../Interface/Address';
import {UserInscription, User, UserLogin} from '../Interface/User';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/auth/authentication.service';
import {DateOfBirthValidator} from '../validators/inputvalidator/dateOfBirth.validator';
import {CookieService} from '../services/cookie/cookie.service';
import {UserService} from "../services/user/user.service";
import {Router} from "@angular/router";
import {AddressService} from "../services/address/address.service";
import {RegisterService} from "../services/register/register.service";
import {PasswordmatchValidator} from "../validators/passwordMatchValidator/passwordmatch.validator";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private http: HttpClient, private authService: AuthenticationService,
              private ageIsValid: DateOfBirthValidator, private cookieService: CookieService,
              private userService: UserService, private addressService: AddressService,
              private router: Router, private registerService: RegisterService,
  ) {

  }

  //* Variables related to the view template
  loginForm !: FormGroup;
  registrationFormGroup !: FormGroup;
  addressObject !: Iaddress; // we use addressOBject to assign its value to userincriptiondetails.address
  addressResultsStatus: boolean = false; // for displaying the results of address from api external
  addressErrorStatus: boolean = true; // for displaying an error if the path number doesn't start with number
  addressInputDisplayStatus: boolean = true;// for displaying the input of address


  userinscriptiondetails: UserInscription = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confPassword: '',
    dateOfBirth: null,
    gender: '',
    address: {
      id: null,
      municipality: '',
      department: '',
      region: '',
      path: '',
      buildingNumber: 0,
      postCode: 0
    }
  };


  // * Variables related to the component class file
  features: Feature[] | null = [];

  //* ViewChild variables
  @ViewChild('header') header!: ElementRef; // getting header tag from view template
  @ViewChild("signinspan") signinspan !: ElementRef;
  @ViewChild("signupspan") signupspan !: ElementRef;
  @ViewChild("firstFace") firstFace !: ElementRef;
  @ViewChild("secondFace") secondFace !: ElementRef;
  @ViewChild("thirdFace") thirdFace !: ElementRef;
  @ViewChild("registrationForm") regForm !: FormGroup;


  ngOnInit(): void {
    this.initLogForm();
    this.initRegistrationForm();
    this.checker();
  }

  //* Searching for address when a change happens
  searchingAddress(value: string) {

    if (value) {
      // check if the user entered a building number at the start or no
      if (!isNaN(parseInt(value.charAt(0)))) {
        this.addressErrorStatus = false;
        this.addressService.getAddressFromExternalApi(value).subscribe(
          (response: FeatureCollection) => {
            this.addressResultsStatus = true;
            this.features = response.features;

          },
          error => {
            console.log("Error");
          }
        )
      } else {
        this.addressErrorStatus = true;
      }
    } else {
      this.addressErrorStatus = true;
      console.log("no Value");
    }
  }

  //* Selecting the address on click event
  selectaddress(divElement: MouseEvent): void {

    // targeting the click Div
    const addressDiv: HTMLDivElement = divElement.target as HTMLDivElement;
    const address: string = (addressDiv.innerHTML).trim();
    const addressArray: string[] = address.split(",");
    const number: number = parseInt(address.charAt(0));// we take the first index of the string to check if there is
    // a building number at the start ot the input


    if (!isNaN(number)) {
      // we check if we have a building number at the start , then we split the first index of addressArray
      // to get building number and path
      const pathArray = addressArray[0].split(" ");
      const buildingNumber: number = parseInt(pathArray[0]);
      let path: string = "";
      const postCode: number = parseInt(addressArray[2].trim());

      //we don't know the number of words of the path then we do a loop, and we ignore the first index(building Number)
      for (let i = 1; i < pathArray.length; i++) {
        path += " " + pathArray[i].trim();
      }

      this.addressErrorStatus = false;
      this.addressObject = {// we use addressOBject to asign its value to userincriptiondetails.address
        id: null,
        municipality: addressArray[1].trim(),
        department: addressArray[4].trim(),
        region: addressArray[5].trim(),
        path: path.trim(),
        buildingNumber: buildingNumber,
        postCode: postCode,
      };
      this.userinscriptiondetails.address = this.addressObject;
      this.addressInputDisplayStatus = false;
      this.addressResultsStatus = false;
    } else {
      console.log("not a number");
      this.addressErrorStatus = true;
    }
  }

  //* Reset the input to set a new address
  resetInput(): void {
    this.userinscriptiondetails.address = {
      id: null,
      municipality: "",
      department: "",
      region: "",
      path: "",
      buildingNumber: null,
      postCode: null,
    };
    this.addressInputDisplayStatus = true;
    this.addressObject = {
      id: null,
      municipality: "",
      department: "",
      region: "",
      path: "",
      buildingNumber: null,
      postCode: null,
    }
    this.registrationFormGroup.get('thirdFaceGroup.street')?.setValue("");

  }

  //* Changing the color of span signin and signup on click in the arrow
  changingColorOfSpan(): void {
    if (getComputedStyle(this.signinspan.nativeElement).color == "rgb(8, 129, 120)") {
      this.signinspan.nativeElement.style.color = "rgb(196, 195, 202)";
      this.signupspan.nativeElement.style.color = "rgb(8, 129, 120)";
    } else {
      this.signinspan.nativeElement.style.color = "rgb(8, 129, 120)";
      this.signupspan.nativeElement.style.color = "rgb(196, 195, 202)";

    }


  };

  //* Submitting the form
  onRegFormSubmit(): void {
    //   console.log(this.registrationFormGroup);
    this.userinscriptiondetails = {
      firstName: this.firstFaceGroup?.value.firstName,
      lastName: this.firstFaceGroup?.value.lastName,
      dateOfBirth: this.firstFaceGroup?.value.dateOfBirth,
      email: this.secondFaceGroup?.value.email,
      password: this.secondFaceGroup?.value.password,
      confPassword: this.secondFaceGroup?.value.confPassword,
      address: this.addressObject,
      gender: this.thirdFaceGroup?.value.gender,
    };
    console.log(this.userinscriptiondetails);

    this.registerService.register(this.userinscriptiondetails).subscribe(
      response => {
        Swal.fire(
          "Cool",
          response.message,
          "success"
        )
      },
      (error) => {
        Swal.fire(
          "Ops",
          error.error.detail,
          "error"
        )

      }
    )
  }

  //* Displaying only the valid date of people over than 18 years old
  ageValidator(control: FormControl): ValidationErrors | null {


    if (this.ageIsValid.ageIsValid(control)) {
      return null; // Valid age
    } else {

      return {ageInvalid: true}; // Age is less than 18
    }
  }


  //* Switching between The Form Faces
  changingFace(click: MouseEvent): void {

    const button = click.target as HTMLDivElement;

    if (button.classList.contains("toSecondFace")) {
      if (button.classList.contains("previousArrow")) {//*From Third Face to Second Face
        this.thirdFace.nativeElement.style.right = "-90%";
        this.secondFace.nativeElement.style.right = "13%";
      } else { //* From First Face to Second Face
        this.firstFace.nativeElement.style.right = "110%";
        this.secondFace.nativeElement.style.right = "13%";

      }
    } else if (button.classList.contains("toFirstFace")) { //* From Second Face to First Face
      this.secondFace.nativeElement.style.right = "-90%";
      this.firstFace.nativeElement.style.right = "13%";

    } else { //* From Second Face to Third Face
      this.secondFace.nativeElement.style.right = "110%";
      this.thirdFace.nativeElement.style.right = "13%";
    }
  }


  initLogForm() {
    this.loginForm = new FormGroup({
      logemail: new FormControl("", [
        Validators.required
      ]),
      logpassword: new FormControl("", [Validators.required])

    })
    // console.log(this.loginForm);
  };

  get logemail() {
    return this.loginForm.get("logemail");
  }

  get logPassword() {
    return this.loginForm.get("logPassword");
  }

  initRegistrationForm() {
    this.registrationFormGroup = new FormGroup({
      firstFaceGroup: new FormGroup({
        firstName: new FormControl(null, [
          Validators.required,
          Validators.pattern("^[a-zA-Z]+$")
        ]),
        lastName: new FormControl(null, [
          Validators.required,
          Validators.pattern("^[a-zA-Z]+( [a-zA-Z]+)?( [a-zA-Z]+)?$")
        ]),
        dateOfBirth: new FormControl(null, [
          Validators.required,
          this.ageValidator?.bind(this)
        ])
      }),

      secondFaceGroup: new FormGroup({
        email: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")
        ]),
        confPassword: new FormControl(null, [
          Validators.required,
          Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")
        ])
      }
      // , {
      //   validators : PasswordmatchValidator('password', 'confPassword')
      // }
      ),

      thirdFaceGroup: new FormGroup({
        street: new FormControl(null, Validators.required),
        gender: new FormControl(null, Validators.required)
      })
    })
  }

  get firstName() {
    return this.registrationFormGroup.get('firstFaceGroup.firstName');
  }

  get lastName() {
    return this.registrationFormGroup.get('firstFaceGroup.lastName');
  }

  get dateOfBirth() {
    return this.registrationFormGroup.get('firstFaceGroup.dateOfBirth');
  }

  get password() {
    return this.registrationFormGroup.get('secondFaceGroup.password');
  }

  get confPassword() {
    return this.registrationFormGroup.get('secondFaceGroup.confPassword');
  }

  get email() {
    return this.registrationFormGroup.get('secondFaceGroup.email');
  }

  get firstFaceGroup(){
    return this.registrationFormGroup.get("firstFaceGroup");
  }

  get secondFaceGroup(){
    return this.registrationFormGroup.get("secondFaceGroup");
  }

  get thirdFaceGroup(){
    return this.registrationFormGroup.get("thirdFaceGroup");
  }


  // check if the user is logged in , then navigate to home page
  checker() {
    if (this.userService.getLoggedUserStatus() || this.userService.getUserInfo() || this.cookieService.getToken()) {
      this.router.navigate(["home"]);
    }
  }

  //* Logging in method
  loginMethod() {
    let user: UserLogin = {
      "username": this.loginForm.value.logemail,
      "password": this.loginForm.value.logpassword
    };

    if (this.loginForm.valid) {
      this.authService.login(user).subscribe(
        (response: User | any): void => {
          this.userService.setUserInfo(response);
          this.userService.setLoggedUserStatus(true);
          this.router.navigate(['home']);
          console.log(response)
          ;
          const fullName: string | undefined = `${response.firstName} ${response?.lastName}`.toUpperCase();

          Swal.fire({
            icon: 'success',
            title: 'Welcome',
            text: `${fullName}`,
          }).then((): void => {
          });
        }
        ,
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Please Check your Email and Password!',
          });
        })
    }


  } ;
}




