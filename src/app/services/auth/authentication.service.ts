import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, switchMap, tap ,catchError} from 'rxjs';
import { throwError } from 'rxjs';
import {apiURL} from 'src/environment/environment';
import {User, UserLogin} from "../../Interface/User";
import {Itoken} from "../../Interface/Token";
import { CookieService} from "../cookie/cookie.service";
import {UserService} from "../user/user.service";
import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http :HttpClient ,
              private cookieService :CookieService,
              private userService :UserService) {  }

  login(credentials:UserLogin){

    let headers : HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.post<Itoken>(`${apiURL}login_check`,credentials , {headers : headers}).pipe(
      tap(
        (dataToken: Itoken | any)=>{
console.log("ici");
          if(!dataToken.error){
            Swal.fire({
              icon: "error",
              title: "Login Failed",
              text : "Check your email and password!"
            })
          }
          this.cookieService.setToken(dataToken.token)
        }
      ),
      switchMap((dataToken :Itoken)=>this.getUser(dataToken.token)),
      catchError((error) => {
        console.error('HTTP request error:', error);
        return throwError(error);
      })
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
    this.userService.setLoggedUserStatus(false);

  }

}
