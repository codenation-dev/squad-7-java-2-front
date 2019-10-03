import { Injectable } from '@angular/core';
import { DetailsLogs } from './github';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpDatabaseService {

  constructor(private _httpClient: HttpClient) { }
  href = `${environment.API_URL}`;

  getRepoIssues(sort: string, order: string, page: number): Observable<DetailsLogs> {


    const requestUrl =
      `${this.href}/log/filter?page=${page}&size=10`;

    return this._httpClient.get<DetailsLogs>(requestUrl);
  }

  forgot(email) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const dataBody = `{ "email": "${email}" }`;
    return this._httpClient.post<any>(`${this.href}/auth/forgot`, dataBody, httpOptions).pipe(take(1));
  }

  save(dataBody: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this._httpClient.post(`${this.href}/user`, dataBody, httpOptions).pipe(take(1));

  }
}
