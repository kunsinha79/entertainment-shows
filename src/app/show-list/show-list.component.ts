import { Component, OnInit } from '@angular/core';
import { iClassifiedList, iShowList, iShowSearch } from '../interfaces/showList';
import { ShowService } from '../show.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html'
})

export class ShowListComponent implements OnInit {

  showList: Array<iShowList> = [];
  showCategorizedList: Array<iClassifiedList>|undefined = [];

  constructor(
    private showService: ShowService
  ) { }

  ngOnInit(): void {
    this.getAllShows();
  }

  search(data: String): void {
    if (data) {
      this.showService.searchShows(data).subscribe(
        (res) => this.showCategorizedList = res,
        () => this.showCategorizedList = undefined
      );
    } else this.getAllShows();    
  }

  getAllShows(): void {
    this.showService.getShowList().subscribe(
      res => this.showCategorizedList = res,
      () => this.showCategorizedList = undefined
    );
  }
}
