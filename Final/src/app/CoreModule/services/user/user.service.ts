import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Profile } from '../../interfaces/profile';
import { User } from '../../interfaces/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl="http://localhost:3000/";
  selectedProfile = new Profile;
  currentUser = new User;
  constructor(public http:HttpClient) { }
  register(user: any) {
    return this.http.post(this.baseUrl+'api/users',{"user":user} );
  }
  getProfile(name:string|any){
    return this.http.get(this.baseUrl+'api/profiles/'+name)
  }
  checkUsername(name:string){
    return this.http.get(this.baseUrl+'api/profiles/'+name);
  }
  getUser(){
    return this.http.get(this.baseUrl+'api/user');
  }
  getCurrentUser(): Observable<User> {
    if (this.currentUser.username) {
      return of(this.currentUser);
    } else {
      return this.http.get(this.baseUrl + 'api/user').pipe(
        map((data:any) => data['user'] as User),
        tap(data => {
          this.currentUser = data;
        })

      );
    }
  }
  getUsername(): string |any{
    return this.currentUser.username;
  }
  setClickedProfile(profile: Profile) {
    this.selectedProfile = profile;
  }

  getClickedProfile(): BehaviorSubject<Profile> {
    return new BehaviorSubject(this.selectedProfile);
  }

  followUser(username: string|undefined) {
    return this.http.post(this.baseUrl + 'api/profiles/' + username + '/follow', '').pipe(
      map((data:any) => data['profile']),
      tap(data => this.selectedProfile = data)
    );
  }

  unfollowUser(username: string|undefined){
    return this.http.delete(this.baseUrl + 'api/profiles/' + username + '/follow').pipe(
      map((data:any) => data['profile']),
      tap(data => this.selectedProfile = data)
    );
  }
}
