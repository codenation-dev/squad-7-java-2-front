import { Injectable } from '@angular/core';
import { DetailsLogs } from './github';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpDatabaseService {

  constructor(private _httpClient: HttpClient) { }

  getRepoIssues(sort: string, order: string, page: number): Observable<DetailsLogs> {
    const href = 'https://central-erros-squad7.herokuapp.com/log/filter';
    // const requestUrl =
    //  `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}`;

    const requestUrl =
      `${href}?page=${page + 1}&size=10`;

    return this._httpClient.get<DetailsLogs>(requestUrl);
  }
}
