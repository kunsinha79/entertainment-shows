import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { iClassifiedList, iShowDetails, iShowList, iShowSearch } from '../interfaces/showList';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  API_URL: string = 'http://api.tvmaze.com';

  genres: Array<string> = ['Adventure', 'Comedy', 'Crime', 'Family', 'Children', 'Adult', 'DIY', 'Action', 'Horror', 'Drama'];
  
  categorizedShow: Array<iClassifiedList> = [];

  constructor(private http: HttpClient) { }

 /**
   * Method to fetch list of all shows
   * @param keyword 
   * @returns Object list of all shows categorized by genres
   */
  getShowList(): Observable<iClassifiedList[]> {
    return this.http.get<iShowList[]>(`${this.API_URL}/shows`)
    .pipe(
      map((res: iShowList[]) => {

        return <iClassifiedList[]>this.categorizeList(res);

      }),
      catchError(err => 
        throwError(`An error has occurred ${err}`)
      )
    );
  }

  /**
   * Method to fetch list of all shows searched by keyword
   * @param keyword 
   * @returns Object containing list of shows
   */
  searchShows(keyword: string): Observable<iClassifiedList[]> {
    return this.http.get<iShowSearch[]>(`${this.API_URL}/search/shows?q=${keyword}`)
    .pipe(
      map((res: iShowSearch[]) => {
        return <iClassifiedList[]>this.categorizeList(res.map(r=> r.show));
      }),
      catchError( err => 
        throwError(`An error has occurred ${err}`)
      )
    );
  }

  /**
   * Method to return show details fetched by showId
   * @param showId 
   * @returns Object containing particulars of show
   */
  getShowById(showId: number): Observable<iShowDetails> {
    return this.http.get<iShowDetails>(`${this.API_URL}/shows/${showId}`)
    .pipe(
      map((res: iShowDetails) => res),
      catchError(err => 
        throwError(`An error has occurred ${err}`)
      )
    );
  }

  /**
   * Method to categorize list based on genres
   * @param showList 
   * @returns Object containing categorized shows based on genres
   */
  categorizeList( showList: Array<iShowList>): Array<iClassifiedList> {
    this.categorizedShow = [];

    this.genres.forEach(genre => { 
      this.categorizedShow.push(
        {
          genre: genre,
          shows: showList.filter(f => f.genres.includes(genre))
        }
      )
    });
    return <Array<iClassifiedList>>this.categorizedShow;
  }
}
