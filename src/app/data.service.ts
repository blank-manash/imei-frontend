import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Receiver {
  already : boolean;
  num : number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private REST_API_SERVER: string = '';
  constructor(private httpClient: HttpClient) { }


  public getRequest(id: string) {
    return this.httpClient.
      get<Receiver>(this.REST_API_SERVER +"/"+id).
      pipe(retry(5), catchError(this.errorHandler));
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
