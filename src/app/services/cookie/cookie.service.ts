import { Injectable } from '@angular/core';
import { CookieService as CookieNgx } from 'ngx-cookie-service';
import {Itoken} from "../../Interface/Token";


@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(private cookieService : CookieNgx) { }

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
