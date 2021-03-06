import { Component, OnInit } from '@angular/core';
import { iClassifiedList, iShowList, iShowSearch } from '../../interfaces/showList';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html'
})

export class ShowListComponent implements OnInit {

  showList: Array<iShowList> = [];
  showCategorizedList: Array<iClassifiedList> = [];
  isLoading: Boolean = false;
  isError: Boolean = false;

  constructor(
    private showService: ShowService
  ) { }

  ngOnInit(): void {
    this.getAllShows();
  }

  /**
   * Event handler for fetching list of shows based on keyword
   * @param data 
   */
  search(keyword: string): void {
    if (keyword) {
      this.isLoading = true;
      this.showService.searchShows(keyword).subscribe(
        (res) => {
          this.setList(res);
        },
        () => this.setError()
      );
    } else this.getAllShows();    
  }

  /**
   * Method to fetch list of all shows
   */
  getAllShows(): void {
    this.isLoading = true;
    this.showService.getShowList().subscribe(
      res => {
       this.setList(res);
      },
      () => this.setError()
    );
  }

  setError(): void {
    this.showCategorizedList = [];
    this.isLoading = false;
    this.isError = true;
  }

  setList(response: Array<iClassifiedList>): void {
    this.isLoading = false;
    this.showCategorizedList = response;
    this.isError = false;
  }
}
