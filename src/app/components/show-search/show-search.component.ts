import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-show-search',
  templateUrl: './show-search.component.html'
})
export class ShowSearchComponent{

  @Output() searchCriteria = new EventEmitter<string>();
  searchTerm: string | undefined;


  search(): void {
    this.searchCriteria.emit(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchCriteria.emit(this.searchTerm);
  }

}
