import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    @Inject('BASE_URL') private baseUrl: string,
  ) {}

  onError(error: any) {
    this.snackBar.open(error.message || error, 'close', { duration: 3000 });
    return throwError(
      error.error instanceof ErrorEvent ? error.error.message : error.message,
    );
  }

  request<T>({ method, url, body, params }: any) {
    return this.http
      .request<T>(method, this.baseUrl + url, {
        body,
        params,
        headers: {
          'x-token': localStorage.getItem('accessToken') || '',
        },
      })
      .pipe(catchError((error) => this.onError(error)));
  }
}
