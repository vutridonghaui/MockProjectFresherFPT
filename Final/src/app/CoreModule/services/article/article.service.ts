import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Article } from '../../interfaces/article'
import { AuthenticationService } from '../auth-service/authentication.service';
import { tap, map, filter } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from '../../interfaces/user.class';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  //  baseURL = 'https://conduit.productionready.io';
  private baseURL: string ='http://localhost:3000'

  pagelimit: number = 10;
  pagescount!: number;
  filter:string='';
  currentUser= new User
  username:string='';
  newtag:Observable<string>;
  tagSubject=new ReplaySubject<string>(1);
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { 
    this.newtag=this.tagSubject.asObservable();
  }

  get pageLimit(): number {
    return this.pagelimit;
  }

  set pageLimit(limit: number) {
    this.pagelimit = limit;
  }
  setTag(tag:string){
    this.tagSubject.next(tag);
  }
  get pagesCount(): number {
    return this.pagescount;
  }

  setFilter(filter: string) {
    this.filter=filter;
  }
  
  getArticlesWithFilter(page: number, filterValue?: string): Observable<Article[]> {
    let offset = (page - 1) * this.pageLimit;
    let apiURL = this.baseURL + '/api/articles?limit=' + this.pageLimit;
     if (this.filter!='' && filterValue && filterValue!='') {
      apiURL+= `&${this.filter}=${filterValue}`;
    }
    if (offset > 0) apiURL += ('&offset=' + offset);
    return this.http.get(apiURL).pipe(
      tap((data:any) => this.pagescount = Math.ceil(data['articlesCount']/this.pageLimit)),
      map(data => data['articles'] as Article[])
    );
  }
  
  getFeed(page: number): Observable<Article[]> {
    let offset = (page - 1) * this.pageLimit;
    let apiURL = this.baseURL + '/api/articles/feed?limit=' + this.pageLimit;  
    if (offset > 0) apiURL += ('&offset=' + offset);
    return this.http.get(apiURL).pipe(
      tap((data:any) => this.pagescount = Math.ceil(data['articlesCount']/this.pageLimit)),
      map(data => data['articles'] as Article[])
    );
  }
  getTags():  Observable<any>{
    return this.http.get(this.baseURL + '/api/tags');
      
  }

}