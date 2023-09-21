import { Injectable } from '@angular/core';
import {User, UserEdit} from "../../_Interface/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "../cookie/cookie.service";
import {apiURL} from "../../../environment/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http :HttpClient , private cookieService : CookieService) { }


  updateUserInfo(userInfo : any): Observable<any>{

    const token :string = this.cookieService.getToken();
    const url :string = `${apiURL}editprofile`;
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    const httpOptions = {
      headers: headers
    };

    return this.http.post<UserEdit>(url , userInfo ,httpOptions);
  }

}
