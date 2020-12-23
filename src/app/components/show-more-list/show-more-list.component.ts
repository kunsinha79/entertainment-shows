import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iClassifiedList } from '../../interfaces/showList';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-show-more-list',
  templateUrl: './show-more-list.component.html'
})

export class ShowMoreListComponent implements OnInit {

  showCategorizedList: Array<iClassifiedList>|undefined = [];
  isLoading: Boolean = false;
  isError: Boolean = false;

  constructor(
    private showService: ShowService,
    private route: ActivatedRoute
  ) { }

  /**
   * Method to extract genre from route param and call get show list
   */
  ngOnInit(): void {
    this.isLoading = true;
    const genre = this.route.snapshot.paramMap.get('genre');
    this.showService.getShowList().subscribe(
      res => {
        this.showCategorizedList = res.filter( r => r.genre === genre);
        this.isLoading = false;
        this.isError = false;
      },
      () => {
        this.showCategorizedList = [];
        this.isLoading = false;
        this.isError = true;
      }
    );
  }
}
