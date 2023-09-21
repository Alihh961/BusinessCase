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
import {User} from '../_Interface/User';
import {AuthenticationService} from "../_services/auth/authentication.service";
import {CookieService} from "../_services/cookie/cookie.service";
import {UserService} from "../_services/user/user.service";
import {NavigationEnd, Router} from "@angular/router";
import {StartupService} from "../_services/startUp/startup.service";


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
              private startUpService : StartupService) {
  }


  @ViewChild('header') header!: ElementRef; // getting header tag from view template

  logoSource: string = './assets/imgs/WIKA_Logo.png';
  isOpened: boolean = false;
  loginInStatus: boolean = false;
  loggedUser ?: User;
  @ViewChild("profilerContainer") profileContainer!: ElementRef;
  @ViewChild("profilerOpenArrow") profilerOpenArrow!: ElementRef;

  ngOnInit(): void {
    this.checkUser(); // check if we have a token and if it valid then return back user

    // Forcing the information related to the loggeduser and loginstatus to be changed
    // if we don't force it , the informations related to the user will stay the say (full name for example)
    // or the full name wont be displayed in the header section
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          this.loginInStatus = this.userService.getLoggedUserStatus();
          this.loggedUser = this.userService.getUserInfo();
        }
      }
    )



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
    // we add a condition
    if (this.profileContainer && this.profilerOpenArrow) {
      let profilerContainer = this.profileContainer.nativeElement;
      let arrowProfiler = this.profilerOpenArrow.nativeElement;
      profilerContainer.classList.toggle("openedProfiler");
      arrowProfiler.classList.toggle("openedArrow");
    }
  }

  checkUser() {
    let token = this.cookieService.getCookie("token");
    if (token) {
      this.authService.getUser(token).subscribe(
        response => {
          this.startUpService.setLoadingStatus(false);// hide loading component
          this.userService.setUserInfo(response);// save the user info in the service
          this.userService.setLoggedUserStatus(true);// set logged in user status to true
          this.loggedUser = response;
          this.loginInStatus = true;
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }

  logout() {
    this.userService.setLoggedUserStatus(false);
    this.userService.setUserInfo(undefined);
    this.cookieService.removeCookie("token");
    this.loginInStatus = false;
    this.loggedUser = undefined;
    this.router.navigate(['login']);

  }


}

