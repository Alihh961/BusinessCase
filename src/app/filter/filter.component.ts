import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiURL} from "../../environment/environment";
import {SubCategory} from "../Interface/SubCategory";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit{

  constructor(
    private http :HttpClient
  ) {
  }
  subCategories ?: SubCategory[] ;

  // inputting the value of the filter from gallery component to filter Component(two way binding)
  @Input() all: number = 0;

  subCategoryFilterValue :string = "";


  //  create an event to send the value to parent component(gallery) when the radio input is changed
  @Output()
  filterSelectionChangedEvent: EventEmitter<string> = new EventEmitter<string>();


  ngOnInit(){
  this.getAllSubCategories();
  }

  getAllSubCategories(){
    this.http.get<SubCategory[]>(`${apiURL}sub-category`).subscribe(
      (data :SubCategory[]) => {
        this.subCategories = data;
      }
    )
  }

  onFilterSelectionChanged() {

    this.filterSelectionChangedEvent.emit(this.subCategoryFilterValue);

  }
}
