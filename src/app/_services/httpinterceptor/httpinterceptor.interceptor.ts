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

  return next.handle(request);


  }
}
