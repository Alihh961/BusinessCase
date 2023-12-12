import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {SubCategory} from "../../_Interface/SubCategory";
import {apiURL} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(
    private http : HttpClient
  ) { }

  private subCategoryInputValueSubject = new BehaviorSubject<string>('');
  inputValue$ = this.subCategoryInputValueSubject.asObservable();

  private ascDescSubject = new BehaviorSubject<string>('');
  ascDescValue = this.ascDescSubject.asObservable();

  getAllSubCategories():Observable<SubCategory[]>{
    return this.http.get<SubCategory[]>(`${apiURL}sub-category`);
  }

  setSubCategoryInputValue(value :string):void{
    this.subCategoryInputValueSubject.next(value);
  }

  setAscDesc(value :string){
    console.log("value is : " + value);
    this.ascDescSubject.next(value);
  }


}
