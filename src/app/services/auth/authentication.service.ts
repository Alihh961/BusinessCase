import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, switchMap, tap ,catchError} from 'rxjs';
import { throwError } from 'rxjs';
import {apiURL} from 'src/environment/environment';
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

  login(credentials: UserLogin): Observable<User | any> {
    let headers : HttpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});
    return this.http.post<Itoken>(`${apiURL}login_check`, credentials , {headers : headers}).pipe(
      switchMap((data: Itoken) => {
        this.cookieService.setToken(data.token);
        return this.getUser(data.token);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError('Error getting token');
      })
    );
  }


  getUser(token :string):Observable<User | any>{

    const headers :HttpHeaders = new HttpHeaders( {
      'Content-Type' : 'application/json',
      Authorization : `Bearer ${token}`
    });
    const httpOptions = {
      headers: headers
    };
    return this.http.get<User>(`${apiURL}user`, httpOptions).pipe(
      catchError((error :HttpErrorResponse)=>{
        return throwError("Errrrrrror")
      }));
  }

  logout(){
    this.cookieService.removeCookie('token');
    this.userService.setLoggedUserStatus(false);

  }

}
