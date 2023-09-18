import { Component } from '@angular/core';
import {StartupService} from "./services/startUp/startup.service";
import {CookieService} from "./services/cookie/cookie.service";
import {UserService} from "./services/user/user.service";
import {TogglebodyclassService} from "./services/body/togglebodyclass.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private startUpService : StartupService,
    private cookieService : CookieService,
    private userService : UserService,
    private toggleBody : TogglebodyclassService,
  ) { }

  loadingStatus:boolean = false;
  userVerified : boolean | undefined = false;

  ngOnInit(){
     this.startUpService.loadingStatus$.subscribe(
       r=>{
         this.loadingStatus =r ;
       }
     );
     this.loading();
     this.isVerified();
     this.toggleBodyClass();
  }




  // we check if we have a token and no user returned yet then we display the loading component
  loading(){
    if(this.cookieService.getToken() && !this.userService.getLoggedUserStatus()){
      this.startUpService.setLoadingStatus(true);
    }
  }

// we check if the user is not verified to display a notification to verify his account
  isVerified(){
    this.userService.loggedUser$.subscribe(
      response=>{
        this.userVerified = response?.isVerified;
      }
    )

  }

  // we toggle the overflow hidden when startup component is displayed to avoid scroll bar
  toggleBodyClass(){
    const body :HTMLBodyElement | null = document.querySelector("body");
    this.toggleBody.toggleClass$.subscribe(
      (response)=> {
        if(response){
          body?.classList.add("overflow-hidden")
        }else{
          body?.classList.remove("overflow-hidden")

        }
      }
    )
  }


  }
