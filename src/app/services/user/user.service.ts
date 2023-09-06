import { Injectable } from '@angular/core';
import { CookieService as CookieNgx } from 'ngx-cookie-service';
import {User} from "../../Interface/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private CookieService : CookieNgx) { }

  private loggedUser ?:User;
  private loggedStatus :boolean = false;



  setUserInfo(User:User | undefined):void{
    this.loggedUser = User;
  }

  getUserInfo():User | undefined{
    return this.loggedUser;
  }

  setLoggedUserStatus(value :boolean): void{
    this.loggedStatus = value;
  }

  getLoggedUserStatus() :boolean{
    return this.loggedStatus;
  }

}
