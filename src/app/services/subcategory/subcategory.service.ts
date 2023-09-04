import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubCategory} from "../../Interface/SubCategory";
import {apiURL} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(
    private http : HttpClient
  ) { }

  getAllSubCategories():Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(`${apiURL}sub-category`);
  }

}
