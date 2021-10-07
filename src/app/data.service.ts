import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Receiver {
  already: boolean;
  num: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER: string = environment.baseURL;
  constructor(private httpClient: HttpClient) { }


  public getRequest(id: string) {
    const uri: string = this.REST_API_SERVER + id;

    const headers = new HttpHeaders().
      set('Accept', 'application/json');
    return this.httpClient.
      get<Receiver>(uri, {'headers' : headers}).
      pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    let errorMsg: string = "Unknown Error";
    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error : ${error.error.message}`;
    } else {
      errorMsg = `Error Code : ${error.status}\n Error Message: ${error.message}`;
    }
    return throwError(errorMsg);
  }

}
