import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  asNativeElements,
  HostListener,
  Input,
  AfterViewChecked
} from '@angular/core';
import {User} from '../Interface/User';
import {AuthenticationService} from "../services/auth/authentication.service";
import {CookieService} from "../services/cookie/cookie.service";
import {UserService} from "../services/user/user.service";
import {NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements AfterViewChecked {

  constructor(private authService: AuthenticationService,
              private cookieService: CookieService,
              private userService: UserService,
              private router: Router) {
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
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          this.loginInStatus = this.userService.getLoggedUserStatus();
          this.loggedUser = this.userService.getUserInfo();
        }
      }
    )
  }


  ngAfterViewChecked() {

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
    let profilerContainer = this.profileContainer.nativeElement;
    let arrowProfiler = this.profilerOpenArrow.nativeElement;
    profilerContainer.classList.toggle("opennedProfiler");
    arrowProfiler.classList.toggle("openedArrow");
  }

checkUser()
{
  let token = this.cookieService.getCookie("token");
  if (token) {
    this.authService.getUser(token).subscribe(
      response => {

        this.userService.setUserInfo(response);
        this.userService.setLoggedUserStatus(true);
        this.loggedUser = response;
        this.loginInStatus = true;
      },
      () => {
        console.log("Try to connect!")
      }
    )
  }
}

logout()
{
  this.userService.setLoggedUserStatus(false);
  this.userService.setUserInfo(undefined);
  this.cookieService.removeCookie("token");
  this.loginInStatus = false;
  this.loggedUser = undefined;
  this.router.navigate(['login']);

}


}

