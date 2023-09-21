import { Injectable } from '@angular/core';
import { CookieService as CookieNgx } from 'ngx-cookie-service';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private token : BehaviorSubject<string> = new BehaviorSubject<string>("");
  token$ = this.token.asObservable();

  constructor(private cookieService : CookieNgx) { }

  setTokenInService(value:string){
    this.token.next(value);
  }

  setToken(value :string):void{
    this.cookieService.set("token" , value);
  }

  getToken():string{
    return this.cookieService.get("token");
  }

  setCookie(name :string , value :string):void{
    this.cookieService.set(name,value);
  }

  getCookie(name :string):string{
    return this.cookieService.get(name);
  }

  getAllCookies():{ [key: string]: string;}{
    return this.cookieService.getAll();
  }

  removeCookie(name:string){
    this.cookieService.delete(name);
  }

  removeAllCookies(){
    this.cookieService.deleteAll();
  }

}
