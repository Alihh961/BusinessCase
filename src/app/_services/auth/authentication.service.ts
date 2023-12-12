import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, switchMap, catchError, map, of, tap} from 'rxjs';
import {apiURL} from 'src/environment/environment';
import {User, UserLogin} from "../../_Interface/User";
import {CookieService} from "../cookie/cookie.service";
import {UserService} from "../user/user.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private userService: UserService,
  ) {
  }

  login(credentials: UserLogin): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<{ token: string, user: User}>(`${apiURL}login_user`, credentials, {headers: headers}).pipe(
      switchMap((data: { token: string, user: User }) => {

        this.cookieService.setToken(data.token);
        this.cookieService.setTokenInService(data.token);

        return of(data.user);

      })
    );
  }

  getUser(token: string): Observable<User> {
    return this.http.post<User>(`${apiURL}check_token`, {token : token});
  }


// I use for guard to check if the token is for a valid user
  isAuthenticated():Observable<boolean> {

    if (this.cookieService.getToken()) {
      const token: string = this.cookieService.getToken();

      console.log(token);
      return this.getUser(token).pipe(
        tap(response=> console.log({"response" :response})),
        map(response => typeof response === 'object' && "firstName" in response),
        catchError(error => {
          console.log({"error :" : error});
          return of(false);
        })
      );
    } else {
    return of(false);
    }
  }


}
