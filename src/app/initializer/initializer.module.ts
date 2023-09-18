import {APP_INITIALIZER, NgModule} from '@angular/core';
import {interval, take} from 'rxjs';
import {UserService} from "../services/user/user.service";
import {AuthenticationService} from "../services/auth/authentication.service";
import {CookieService} from "../services/cookie/cookie.service";



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
