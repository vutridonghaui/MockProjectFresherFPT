
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '../../interfaces/user.class'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    // private baseURL: string = "https://api.realworld.io/";
    private baseURL: string ='http://localhost:3000/'
    private currentUserSubject: BehaviorSubject<User>;//
    public currentUser: Observable<User>;//User>
    constructor(private http: HttpClient) {
        let currentUser=JSON.parse(localStorage.getItem('currentUser')|| '{}');
        this.currentUserSubject = new BehaviorSubject<User>(currentUser);
        this.currentUser = this.currentUserSubject.asObservable();
      
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    isAuthenticated(): BehaviorSubject<boolean> {
        return new BehaviorSubject(this.getToken() != null && !this.isTokenExpired());
      }
    public getToken() {
        return localStorage.getItem('token');
      }
    public isTokenExpired(): boolean {
        return false;
      }
    public getPassword():any{
      return localStorage.getItem('password');
    }

    login(email: string, password: string) {

      return this.http.post<any>(this.baseURL+"api/users/login",{"user":{ email, password }} )
          .pipe(map((user:any) => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              localStorage.setItem('token', user['user']?.token);
              localStorage.setItem('password', password)
              this.currentUserSubject.next(user);
              return user;
          }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        this.currentUserSubject.next({});
    }
    updateUser(user: User): Observable<User> {
        return this.http.put(this.baseURL + 'api/user', { 'user': user }).pipe(
          map((user:any) => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('password',user.password)
            this.currentUserSubject.next(user);
            return user;
        })
        );
      }
}
