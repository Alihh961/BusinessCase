import { Injectable } from '@angular/core';
import { CookieService as CookieNgx } from 'ngx-cookie-service';
import {User} from "../../Interface/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private CookieService : CookieNgx) { }

  setUserInfo(User:User):void{
    this.CookieService.set("User", JSON.stringify(User));
  }

  getUserInfo():string{
    return JSON.parse(this.CookieService.get("User"));
  }


}
