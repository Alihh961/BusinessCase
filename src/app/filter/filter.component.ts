import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubcategoryService} from '../services/subcategory/subcategory.service';
import {SubCategory} from "../Interface/SubCategory";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(
    private SubcategoryService :SubcategoryService,

) {
}

subCategories ? : SubCategory[];
subCategoryFilterValue :string = "";
orderBy :string = "ASC";


//  create an event to send the value to parent component(gallery) when the radio input is changed
@Output()
filterBySubCategoryChangedEvent
:
EventEmitter<string> = new EventEmitter<string>();


ngOnInit()
{
  this.getAllSubCategories();
}

getAllSubCategories()
{
  this.SubcategoryService.getAllSubCategories().subscribe(
    (data: SubCategory[]) => {
      this.subCategories = data;
    }
  )
}


// sending subcategoryName to gallery to filter the nfts
onFilterChange()
{

  this.filterBySubCategoryChangedEvent.emit(this.subCategoryFilterValue);

}

// Reseting the filter
onResetFilter()
{
  this.subCategoryFilterValue = "";
  this.filterBySubCategoryChangedEvent.emit("all");
}
}
