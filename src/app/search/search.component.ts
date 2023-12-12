import { Component, EventEmitter,Output } from '@angular/core';
import {SubcategoryService} from "../_services/subcategory/subcategory.service";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

searchInputValue: string = "";

// search input value event
@Output()
searchInputValueEvent: EventEmitter<string> = new EventEmitter<string>();

constructor(
  private subCategoryService :SubcategoryService
) {
}

ngOnInit(){
  this.setSearchInputValue();
}

onSearchValueChange(){
  this.searchInputValueEvent.emit(this.searchInputValue);
}

setSearchInputValue(){
  this.subCategoryService.inputValue$.subscribe(
    data => {
      this.searchInputValue = data;
    }
  )
}

}
