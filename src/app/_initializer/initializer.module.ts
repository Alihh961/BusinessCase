import {APP_INITIALIZER, NgModule} from '@angular/core';
import {interval, take} from 'rxjs';
import {UserService} from "../_services/user/user.service";
import {AuthenticationService} from "../_services/auth/authentication.service";
import {CookieService} from "../_services/cookie/cookie.service";



@NgModule({
providers : [
  {
  provide : APP_INITIALIZER,
    multi : true ,
    useFactory : (authService : AuthenticationService , cookieService :CookieService)=>{
      return ()=>{
        // authService.getUserTest(cookieService.getToken());
        // return authService.user$.pipe(take(1));
      }

    },
    deps:[AuthenticationService , CookieService]

}
]
})
export class InitializerModule { }
