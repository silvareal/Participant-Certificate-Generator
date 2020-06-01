import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  currentUser: User[];
  constructor(private http: HttpClient) { }

  registerUser(userData): Observable<any> {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    return this.http.post(`${this.baseUrl}/users/`, userData, options)
      .pipe(tap(data => {
        this.currentUser = <any>data['user']
      }))
      .pipe(catchError(err => {
        return of(false)
      }))
  }

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
