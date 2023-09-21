import { Component, EventEmitter,Output } from '@angular/core';


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

onSearchValueChange(){
  this.searchInputValueEvent.emit(this.searchInputValue);
}

}
