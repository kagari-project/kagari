import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {}

  onError(error: any) {
    return throwError(
      error.error instanceof ErrorEvent ? error.error.message : error.message,
    );
  }

  request({ method, url, body }: any) {
    return this.http
      .request(method, this.baseUrl + url, { body })
      .pipe(catchError(this.onError));
  }
}
