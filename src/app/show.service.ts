import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { iClassifiedList, iShowDetails, iShowList, iShowSearch } from './interfaces/showList';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  genres: Array<string> = ['Adventure', 'Comedy', 'Crime', 'Family', 'Children', 'Adult', 'DIY', 'Action', 'Horror'];
  
  categorizedShow: Array<iClassifiedList> = [];

  constructor(private http: HttpClient) { }

  getShowList(): Observable<iClassifiedList[]> {
    return this.http.get<iShowList[]>('http://api.tvmaze.com/shows')
    .pipe(
      map((res: iShowList[]) => {
        this.categorizedShow = [];
        this.genres.forEach(genre => { 
          this.categorizedShow.push(
            {
              genre: genre,
              shows: res.filter(f => f.genres.includes(genre))
            }
          )
        });
        return <iClassifiedList[]>this.categorizedShow;
      }),
      catchError(() => { 
        return [];
      })
    );
  }

  searchShows(data: String): Observable<iClassifiedList[]> {
    return this.http.get<iShowSearch[]>(`http://api.tvmaze.com/search/shows?q=${data}`)
    .pipe(
      map((res: iShowSearch[]) => {
        this.categorizedShow = [];
        const shows = res.map(r=> r.show);
        this.genres.forEach(genre => { 
          this.categorizedShow.push(
            {
              genre: genre,
              shows: shows.filter(f => f.genres.includes(genre))
            }
          )
        });;
        return <iClassifiedList[]>this.categorizedShow;
      }),
      catchError(() => { 
        return [];
      })
    );
  }

  getShowById(showId: Number): Observable<iShowDetails> {
    return this.http.get<iShowDetails>(`http://api.tvmaze.com/shows/${showId}`)
    .pipe(
      map((res: iShowDetails) => res),
      catchError(() => { 
        return [];
      })
    );
  }
}
