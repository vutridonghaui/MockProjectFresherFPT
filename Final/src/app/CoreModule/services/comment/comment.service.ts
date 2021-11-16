import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticationService } from '../auth-service/authentication.service';
import { Comment } from '../../interfaces/comment.class';
import { User } from '../../interfaces/user.class';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  isLogin?:boolean
  baseUrl="http://localhost:3000/";
  currentSlug = '';
  currentUser=new User
  listComments: Comment[] = [];
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.authService.currentUser.subscribe((data:any)=>{
      this.currentUser=data['user'];
      this.isLogin=true;
    })
   }

  getCommentsList(slug: string) {
    this.currentSlug = slug;
    return this.http.get(this.baseUrl + 'api/articles/' + slug + '/comments').pipe(
      map((data:any) => data['comments'] as Comment[]),
      tap(data => this.listComments = data)
    );
  }

  addComment(body: any): Observable<Comment> {
    return this.http.post(this.baseUrl + 'api/articles/' + this.currentSlug + '/comments', { "comment": { "body": body } }).pipe(
      map((data:any) => data['comment']),
      tap(data => {
        console.log(data)
        let author={
          ...data,
          "author":{
            "_id":data.author,
            "image":this.currentUser.image,
            "username":this.currentUser.username
          },
          'updatedAt':data.createdAt
          
        }
        // data["author"].image=this.currentUser.image;
        this.listComments.push(author)
      })
    );
  }

  deleteComment(id: any, index: any): Observable<any> {
    this.listComments.splice(index, 1);
    return this.http.delete(this.baseUrl + 'api/articles/' + this.currentSlug + '/comments/' + id);
  }

  isOwner(comment: Comment):any {
    if(this.isLogin) return comment.author.username == this.currentUser.username ;
    
    // this.authService.currentUser.subscribe((data:any)=>{
    //   return comment.author.username == data['user'].username ;
      
    // });
    
  }
}
