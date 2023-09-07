import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../Interface/User";
import {apiURL} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http :HttpClient) { }


  register(data :User){
    let header :HttpHeaders = new HttpHeaders({"Content-Type" : "application/json"});

    return this.http.post<User>(`${apiURL}register` ,data , {headers : header});
  }
}
