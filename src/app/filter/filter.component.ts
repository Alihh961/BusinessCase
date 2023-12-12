import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';
import {SubcategoryService} from '../_services/subcategory/subcategory.service';
import {SubCategory} from "../_Interface/SubCategory";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(
    private subcategoryService: SubcategoryService,
  ) {
  }

  subCategories ?: SubCategory[];
  subCategoryFilterValue: string = "";
  orderBy: string = "";


//  create an event to send the value to parent component(gallery) when the select menu value is changed
  @Output()
  filterBySubCategoryChangedEvent: EventEmitter<string> = new EventEmitter<string>();

  @Output() orderByChangedEvent: EventEmitter<void> = new EventEmitter<void>;

  ngOnInit() {
    this.getAllSubCategories();
    this.setOrder();


  }

  setOrder() {
    this.subcategoryService.ascDescValue.subscribe(
      value => {
        this.orderBy = value;
      }
    )
  }

  orderChanged(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      this.subcategoryService.setAscDesc(event.target.value);
    }

    this.orderByChangedEvent.emit();
  }

  getAllSubCategories() {
    this.subcategoryService.getAllSubCategories().subscribe(
      (data: SubCategory[]) => {
        this.subCategories = data;
      }
    )
  }


// sending subcategoryName to gallery to filter the nfts
  onFilterChange() {

    this.filterBySubCategoryChangedEvent.emit(this.subCategoryFilterValue);


  }

// Reseting the filter
  onResetFilter() {

    this.subCategoryFilterValue = "";
    this.filterBySubCategoryChangedEvent.emit("all");
    this.subcategoryService.setSubCategoryInputValue('');

  }
}


