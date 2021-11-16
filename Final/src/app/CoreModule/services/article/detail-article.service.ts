import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Article } from '../../interfaces/article';
import { AuthenticationService } from '../auth-service/authentication.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class DetailArticleService {
  private baseURL: string ='http://localhost:3000';
  private currentArticle! : Article;
  currentArticleSubject: BehaviorSubject<Article>
  newcurrentArticle:Observable<Article>;
  constructor(
    private http: HttpClient,
    private userService:UserService
  ) { 
    this.currentArticleSubject = new BehaviorSubject<Article>(this.currentArticle);
    this.newcurrentArticle=this.currentArticleSubject.asObservable();
  }
  createArticle(newArticle:any){
    return this.http.post(this.baseURL + '/api/articles', {'article': newArticle})
  }

  updateArticle(updatedArticle:any ,slug: string) {
    return this.http.put(this.baseURL + '/api/articles/' + slug, {'article': updatedArticle})
  }
  getArticleBySlug(slug: string) {
    return this.http.get(this.baseURL+ '/api/articles/' + slug).pipe(
      map((value:any) => value['article'] as Article),
      tap(value => {
        this.currentArticle = value;
        this.currentArticleSubject.next(this.currentArticle)
      }
        )
    )
  }

  getCurrentArticle(): BehaviorSubject<Article> {
    return new BehaviorSubject(this.currentArticle);
  }

  favoriteArticle(slug: string): Observable<Article> {
    return this.http.post(this.baseURL + '/api/articles/' + slug + '/favorite','').pipe(
      map((value:any) => value['article'] as Article),
      tap(value =>{
        this.currentArticle = value;
        this.currentArticleSubject.next(value);
      } )
    );
  }
  
  unfavoriteArticle(slug: string): Observable<Article> {
    return  this.http.delete(this.baseURL + '/api/articles/' + slug + '/favorite').pipe(
      map((value:any) => value['article'] as Article),
      tap(value =>{
        this.currentArticle = value
        this.currentArticleSubject.next(value);
      } )
    );
  }

  deleteArticle(): Observable<any> {
    return this.http.delete(this.baseURL + '/api/articles/' + this.currentArticle.slug)
  }
}
