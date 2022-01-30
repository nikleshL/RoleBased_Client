import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  /**
   * Temporary method to handle url with or with out API Gateway changes
   * @param url
   */
   getUrl(url: string) {
    if (environment.apiUrl) {
      return environment.apiUrl + url;
    } else {
      return url;
    }
  }

  /**
   * Fetch Resource
   * @param endpoint
   */
  get = (endpoint: string) => {
    return this.http.get<any[]>(endpoint)
      .pipe(
        catchError(this.handleError<any[]>([]))
      );
  }

  /**
   * To call Post Method
   * @param endpoint
   * @param data
   */
   post(endpoint: string, data: any, token?: string, tokenKey?: string) {
    endpoint = this.getUrl(endpoint);
    let _headers = new HttpHeaders();
    let _httpHeader = _headers.append("Content-Type", "application/json");
    if (token) {
      if (tokenKey) {
        _httpHeader = _headers.append(tokenKey, token);
      } else {
        _httpHeader = _headers.append("CSRF", token);
      }

    }
    let jsonData = data;
    return this.http.post(endpoint, jsonData, { headers: _httpHeader });
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
