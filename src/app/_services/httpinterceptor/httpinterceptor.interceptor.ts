import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { CookieService} from "../cookie/cookie.service";
import {AuthenticationService} from "../auth/authentication.service";
import {Router} from "@angular/router";
import {response} from "express";

@Injectable()
export class HttpinterceptorInterceptor implements HttpInterceptor {

  constructor(private cookieService :CookieService , private authService : AuthenticationService ,
              private router :Router) {}

  localToken :string ="";

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

const token = localStorage.getItem("token");
console.log("interceptor");

      return next.handle(request.clone({ setHeaders : { Authorization : 'bearer'+token, "Content-Type" : "application/json"}}))
        .pipe(
          tap({
            error: (err: any)=>{
              if(err instanceof HttpErrorResponse){
                if (err.status != 401){ // if the error is not an un authorized
                  return;
                }

                // if the error is un authorized (401)
                this.authService.logout();
                this.router.navigate(["home"])
              }
            }
          })
        );

  }
}
