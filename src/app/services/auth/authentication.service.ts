import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, switchMap, tap} from 'rxjs';
import {apiURL, baseURL} from 'src/environment/environment';
import {User, UserLogin} from "../../Interface/User";
import {Itoken} from "../../Interface/Token";
import { CookieService} from "../cookie/cookie.service";
import {UserService} from "../user/user.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http :HttpClient ,
              private cookieService :CookieService,
              private userService :UserService) {  }

  loggedUser :User | null = this.cookieService.getCookie("loggedUser")? JSON.parse(this.cookieService.getCookie("loggedUser")) : null;
  login(credentials:UserLogin){

    let headers : HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
    let token :string = "";
    return this.http.post<Itoken>(`${apiURL}login_check`,credentials , {headers : headers}).pipe(
      tap(
        (dataToken: Itoken)=>{
          this.cookieService.setToken(dataToken.token)
        }
      ),
      switchMap((dataToken :Itoken)=>this.getUser(dataToken.token))
    )
}


  getUser(token :string):Observable<any>{

    console.log(token);
    const headers :HttpHeaders = new HttpHeaders( {
      'Content-Type' : 'application/json',
      Authorization : `Bearer ${token}`
    });
    const httpOptions = {
      headers: headers
    };
    return this.http.get<User>(`${apiURL}user`, httpOptions);
  }

  logout(){
    this.cookieService.removeCookie('token');
    this.cookieService.removeCookie('loggedUser');
    this.loggedUser = null ;
  }

}
