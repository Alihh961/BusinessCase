import { Injectable } from '@angular/core';
import { CookieService as CookieNgx } from 'ngx-cookie-service';
import {User} from "../../Interface/User";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private CookieService : CookieNgx) { }

  private loggedStatus :boolean = false;
  private loggedUserSubject : BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  loggedUser$ : Observable<User | undefined> = this.loggedUserSubject.asObservable();


  setUserInfo(User: User | undefined): void {
    this.loggedUserSubject.next(User);
  }

  getUserInfo(): User | undefined {
    return this.loggedUserSubject.value;
  }

  setLoggedUserStatus(value :boolean): void{
    this.loggedStatus = value;
  }

  getLoggedUserStatus() :boolean{
    return this.loggedStatus;
  }



}
