import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User, UserInscription} from "../../Interface/User";
import {apiURL} from "../../../environment/environment";
import {ResponseSuccess} from "../../Interface/Response";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http :HttpClient) { }


  register(data :UserInscription){
    let header :HttpHeaders = new HttpHeaders({"Content-Type" : "application/json"});

    return this.http.post<ResponseSuccess>(`${apiURL}register` ,data , {headers : header});
  }
}
