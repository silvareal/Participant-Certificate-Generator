import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  currentUser: User[];
  constructor(private http: HttpClient, private toastr: ToastrService,) { }

  registerUser(userData): Observable<any> {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    return this.http.post(`${this.baseUrl}/users/`, userData, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    const silva = 'akubo'
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', JSON.stringify(error.error.message));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error.email)}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  };

  getUser(): Observable<any> {
    let user = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.get<User>(`${this.baseUrl}/users/${user.unique_id}`)
      .pipe(tap(data => {
        this.currentUser = <any>data['user']
      }))
      .pipe(catchError(err => {
        return of(false)
      }))
  }

  loginUser(userData): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth`, userData)
      .pipe(tap(data => {
        this.currentUser = <any>data['user'];
        localStorage.setItem('currentUser', JSON.stringify(data));
      }))
      .pipe(catchError(err => {
        return of(false);
      }))
  }
}
