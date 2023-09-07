import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {Feature, FeatureCollection} from '../Interface/Address';
import {UserInscription, User, UserLogin} from '../Interface/User';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/auth/authentication.service';
import {InputvalidationsService} from '../services/inputvalidator/inputvalidations.service';
import {CookieService} from '../services/cookie/cookie.service';
import {LoggedInUserService} from '../services/loggedinuser/logged-in-user.service';
import {UserService} from "../services/user/user.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs";
import {AddressService} from "../services/address/address.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private http: HttpClient, private authService: AuthenticationService,
              private ageIsValid: InputvalidationsService, private cookieService: CookieService,
              private userService: UserService, private addressService: AddressService,
              private router: Router,
  ) {

  }

  //* Variables related to the view template

  passwordMatch !: boolean;
  patternRespected: boolean = false;
  pattern: any = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  loginForm !: FormGroup;
  registrationFormGroup !: FormGroup;
  addressResultsStatus: boolean = false; // for displaying the results of address from api external
  addressErrorStatus: boolean =true; // for displaying an error if the path number doesn't start with number
  addressInputDisplayStatus :boolean = true;// for displaying the input of address


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
      departement: '',
      region: '',
      path: '',
      buildingNumber: 0,
      postCode: 0
    }
  };


  maxDate!: string; // maxDate for the calendar to prevent under 18 from inscrire


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
    console.log(this.loginForm);

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
      }else{
        this.addressErrorStatus = true;
      }
    }else{
      this.addressErrorStatus = true;
      console.log("no Value");
    }
  }

  //* Selecting the address on click event
  selectaddress(divElement: MouseEvent): void {

    // targeting the click Div
    const addressDiv :HTMLDivElement = divElement.target as HTMLDivElement;
    const address :string = (addressDiv.innerHTML).trim();
    const addressArray: string[] = address.split(",");
    const number:number = parseInt(address.charAt(0));// we take the first index of the string to check if there is
    // a building number at the start ot the input

    console.log(parseInt(address.charAt(0)));


    if (!isNaN(number)) {
      // we check if we have a building number at the start , then we split the first index of addressArray
      // to get building number and path
      const pathArray = addressArray[0].split(" ");
      const buildingNumber :number = parseInt(pathArray[0]);
      let path: string = "";
      const postCode:number = parseInt(addressArray[2].trim());

      //we don't know the number of words of the path then we do a loop, and we ignore the first index(building Number)
      for(let i = 1 ; i < pathArray.length; i++){
        path += " " + pathArray[i].trim();
      }

      this.addressErrorStatus = false;
      this.userinscriptiondetails.address = {
        id : null,
        municipality: addressArray[1].trim(),
        departement: addressArray[4].trim(),
        region: addressArray[5].trim(),
        path: path.trim(),
        buildingNumber: buildingNumber,
        postCode: postCode,
      };
      this.addressInputDisplayStatus = false;
      this.addressResultsStatus = false;
    }else{
      console.log("not a number");
      this.addressErrorStatus = true;
    }
    console.log(this.userinscriptiondetails);

    console.log(this.userinscriptiondetails.address);
  }

  //* Reset the input to set a new address
  resetInput(): void {
    this.userinscriptiondetails.address = {
      id : null,
      municipality: "",
      departement: "",
      region: "",
      path: "",
      buildingNumber: null,
      postCode: null,
    };
    this.addressInputDisplayStatus= true;

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
    console.log(this.registrationFormGroup);
    // this.userinscriptiondetails = {
    //   firstName: this.registrationFormGroup.get("firstFaceGroup")?.get("firstName")?.value,
    //   lastName: this.registrationFormGroup.get("firstFaceGroup")?.get("lastName")?.value,
    //   dateOfBirth: this.registrationFormGroup.get("firstFaceGroup")?.get("birthdate")?.value,
    //   email: this.registrationFormGroup.get("secondFaceGroup")?.get("email")?.value,
    //   password: this.registrationFormGroup.get("secondFaceGroup")?.get("password")?.value,
    //   confPassword: this.registrationFormGroup.get("secondFaceGroup")?.get("confPassword")?.value,
    //   path: this.registrationFormGroup.get("thirdFaceGroup")?.get("path")?.value,
    //   buildingNumber: '',
    //   municipality: '',
    //   department: "" ,
    //   postCode: 0,
    //   region: '',
    //   gender: ''
    // };
    console.log(this.registrationFormGroup.get('firstFaceGroup'));
    console.log(this.registrationFormGroup.get('secondFaceGroup'));
    console.log(this.registrationFormGroup.get('thirdFaceGroup'));

    console.log(this.userinscriptiondetails);


    // this.http.post<string[]>(url, this.userinscriptiondetails).subscribe(
    //   (response) => {
    //     // Handle success response
    //     console.log(response[0]);
    //     if (response[0] === "An account associated to this email!") {
    //       Swal.fire(
    //         'Ops',
    //         response[0],
    //         'error'
    //       )
    //     } else if (response[0] === "Account has been successfully registered") {
    //       Swal.fire(
    //         'Good job!',
    //         response[0],
    //         'success'
    //       )
    //     } else {
    //       Swal.fire({
    //         title: 'Error!',
    //         text: response[0],
    //         icon: 'error',
    //         confirmButtonText: 'Try Again'
    //       })
    //     }
    //
    //   },
    //   (error) => {
    //     // Handle error response
    //     Swal.fire({
    //       title: 'Error!',
    //       text: error,
    //       icon: 'error',
    //       confirmButtonText: 'Cool'
    //     })
    //   }
    // );

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

  //* Check the password match using ngModelChange
  checkPasswordMatch(): void {

    if (this.userinscriptiondetails.password == this.userinscriptiondetails.confPassword) {
      console.log("Passwords are equal");
      this.passwordMatch = true;
    } else {
      console.log("Passwords are not equal");
      this.passwordMatch = false;
    }
  }

  passwordIsValid(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.passwordMatch && this.pattern.test(input.value)) {
      this.patternRespected == true;
    } else {
      this.patternRespected = false;

    }

  }

  initLogForm() {
    this.loginForm = new FormGroup({
      logemail: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
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
          // Validators.pattern("^[a-zA-Z]+$")
        ]),
        lastName: new FormControl(null, [
          Validators.required,
          // Validators.pattern("^[a-zA-Z]+( [a-zA-Z]+)?$")
        ]),
        birthdate: new FormControl(null, [
          Validators.required,
          this.ageValidator?.bind(this)
        ])
      }),

      secondFaceGroup: new FormGroup({
        email: new FormControl(null, [
          Validators.required,
          // Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
        ]),
        password: new FormControl(null, [
          Validators.required,
          // Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")
        ]),
        confPassword: new FormControl(null, [
          Validators.required,
          // Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")
        ])
      }),

      thirdFaceGroup: new FormGroup({
        street: new FormControl(null, Validators.required),
        buildingNumber: new FormControl(null, Validators.required),
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

  get birthdate() {
    return this.registrationFormGroup.get('firstFaceGroup.birthdate');
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

  get street() {
    return this.registrationFormGroup.get('thirdFaceGroup.street');
  }

  get buildingNumber() {
    return this.registrationFormGroup.get('thirdFaceGroup.buildingNumber');
  }

  get gender() {
    return this.registrationFormGroup.get('thirdFaceGroup.gender');
  }

  // check if the user is logged in , then navigate to home page
  checker() {
    console.log(this.userService.getLoggedUserStatus());
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




