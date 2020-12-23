import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-show-search',
  templateUrl: './show-search.component.html'
})
export class ShowSearchComponent{

  @Output() searchCriteria = new EventEmitter<string>();
  searchTerm: string | undefined;

  /**
   * Method to emit event on input change
   */
  search(): void {
    this.searchCriteria.emit(this.searchTerm);
  }

  /**
   * Method to emit event on click of clear button
   */
  clearSearch(): void {
    this.searchTerm = '';
    this.searchCriteria.emit(this.searchTerm);
  }

}
