import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  asNativeElements,
  HostListener,
  Input,
  AfterViewChecked, AfterContentInit
} from '@angular/core';
import {LoggedUser, User} from '../_Interface/User';
import {AuthenticationService} from "../_services/auth/authentication.service";
import {CookieService} from "../_services/cookie/cookie.service";
import {UserService} from "../_services/user/user.service";
import {NavigationEnd, Router} from "@angular/router";
import {StartupService} from "../_services/startUp/startup.service";
import {DropDownMenuService} from "../_services/dropDownMenu/drop-down-menu.service";
import {LoggedInUserService} from "../_services/loggedinuser/logged-in-user.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent {

  constructor(private authService: AuthenticationService,
              private cookieService: CookieService,
              private userService: UserService,
              private router: Router,
              private startUpService: StartupService,
              private dropDownMenuService: DropDownMenuService,
              private loggedInUserService : LoggedInUserService
  ) {
  }


  @ViewChild('header') header!: ElementRef; // getting header tag from view template

  logoSource: string = './assets/imgs/WIKA_Logo.png';
  isOpened!: boolean;
  loginInStatus: boolean = false;
  loggedUser !: User ;
  profilerIsOpened: boolean = false;
  @ViewChild("profilerContainer") profileContainer!: ElementRef;
  @ViewChild("profilerOpenArrow") profilerOpenArrow!: ElementRef;

  ngOnInit(): void {
    this.checkUser(); // check if we have a token and if it valid then return back user
    this.dropDownMenuStatus(); // relate the profile menu to drop down menu service
    // Forcing the information related to the loggeduser and loginstatus to be changed
    // if we don't force it , the information related to the user will stay the say (full name for example)
    // or the full name wont be displayed in the header section
    // this.router.events.subscribe(
    //   event => {
    //     if (event instanceof NavigationEnd) {
    //       this.loginInStatus = this.userService.getLoggedUserStatus();
    //       this.loggedUser = this.userService.getUserInfo();
    //     }
    //   }
    // )
this.loggedInUserService.isLoggedIn$.subscribe(
  value=> {
    this.loginInStatus = value;
  });
  this.loggedInUserService.loggedInUserInfo$.subscribe(
    data=>{
        this.loggedUser = data;
    }
  );

    this.setUserName();


  }

  setUserName(){
    this.loggedInUserService.loggedInUserInfo$.subscribe(
      (response)=>{
          if(response.firstName != "" && response.lastName != ""){
            this.loggedInUserService.setLoggedInStatus(true);
            this.loggedUser.firstName = response.firstName;
            this.loggedUser.lastName = response.lastName;
          }
      }
    )
  }


  // close the menu after navigating
  checkMenu() {

    if (window.innerWidth < 925) {
      this.isOpened = !this.isOpened;
    }
  }


  @HostListener('window:scroll')// listen to the scroll event;

  onWindowScroll() {
    const headerElement = this.header.nativeElement;
    if (window.scrollY !== 0) {

      headerElement.classList.add("onScroll");

    } else {
      headerElement.classList.remove("onScroll");
    }
  }

  openAndCloseMenuBurger() {

    this.isOpened = !this.isOpened;


  }

  openProfiler() {

    this.dropDownMenuService.setDropDownMenu(!this.profilerIsOpened);

  }

  dropDownMenuStatus() {
    this.dropDownMenuService.dropDownMenuStatus$.subscribe(
      value => {
        this.profilerIsOpened = value;
      }
    )
  }

  checkUser() {
    let token:string = this.cookieService.getCookie("token");
    if (token) {
      this.authService.getUser(token).subscribe(
        (response :User )  => {
          this.startUpService.setLoadingStatus(false);// hide loading component
          this.userService.setUserInfo(response);// save the user info in the service
          this.loggedInUserService.setLoggedInUserInfo(response);
          this.userService.setLoggedUserStatus(true);// set logged in user status to true
          this.loggedUser = response;
          this.loginInStatus = true;
        },
        (error) => {
          console.log(error);
          this.startUpService.setLoadingStatus(false);// hide loading component

        }
      )
    }
  }

  logout() {
    this.userService.setLoggedUserStatus(false);
    this.userService.setUserInfo(undefined);
    this.cookieService.removeCookie("token");
    this.loginInStatus = false;
    this.loggedUser = {
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
      gender: "",
      address: {
        id: null,
        municipality: "",
        department: "",
        region: "",
        path: "",
        buildingNumber: null,
        postCode: null,
      },
      dateOfBirth: null,
      isVerified: false,
    };
    this.router.navigate(['login']);

  }


}

