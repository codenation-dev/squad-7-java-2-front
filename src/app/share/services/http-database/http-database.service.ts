import { Injectable } from '@angular/core';
import { DetailsLogs } from './model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpDatabaseService {

  constructor(private _httpClient: HttpClient) { }
  href = `${environment.API_URL}`;

  getLogs(sort: string, order: string, page: number, ambiente: string): Observable<DetailsLogs> {

    let params = new HttpParams()
      .set('pageNumber', `${page}`)
      .set('pageSize', '10')
      .set('pageOrderBy', `${sort}`)
      .set('pageDirection', `${order.toLocaleUpperCase()}`)
      ;
    console.log("ambiente -> " + ambiente);

    if (ambiente !== undefined && ambiente !== null && ambiente.length > 0) {
      params = params.set('environment', `${ambiente}`);
    }

    const requestUrl = `${this.href}/log/filter`;

    return this._httpClient.get<DetailsLogs>(requestUrl, { params });
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

  public delete = (id: string) => {
    return this._httpClient.delete(`${this.href}/log/${id}`, { responseType: 'text' });
  }

  public get(id: string) {
    return this._httpClient.get<any>(`${this.href}/log/${id}`).pipe(take(1));
  }

  public put(dataBody: string) {
    return this._httpClient.put(`${this.href}/log`, dataBody, this.makeHttpOtpions()).pipe(take(1));
  }


  save(dataBody: string) {
    return this._httpClient.post(`${this.href}/user`, dataBody, this.makeHttpOtpions()).pipe(take(1));
  }

  private makeHttpOtpions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }

}
