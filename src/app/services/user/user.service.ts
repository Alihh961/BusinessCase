import { Injectable } from '@angular/core';
import {User} from "../../Interface/User";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private loggedStatusSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedStatus$ :Observable<boolean> = this.loggedStatusSubject.asObservable();

  private loggedUserSubject : BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  loggedUser$ : Observable<User | undefined> = this.loggedUserSubject.asObservable();


  setUserInfo(User: User | undefined): void {
    this.loggedUserSubject.next(User);
  }

  getUserInfo(): User | undefined {
    return this.loggedUserSubject.value;
  }

  setLoggedUserStatus(value :boolean): void{
    this.loggedStatusSubject.next(value);
  }

  getLoggedUserStatus() :boolean{
    return this.loggedStatusSubject.value;
  }



}
