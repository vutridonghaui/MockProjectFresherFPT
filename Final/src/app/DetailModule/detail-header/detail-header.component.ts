import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Article } from 'src/app/CoreModule/interfaces/article';
import { Profile } from 'src/app/CoreModule/interfaces/profile';
import { DetailArticleService } from 'src/app/CoreModule/services/article/detail-article.service';
import { AuthenticationService } from 'src/app/CoreModule/services/auth-service/authentication.service';
import { UserService } from 'src/app/CoreModule/services/user/user.service';

@Component({
  selector: 'app-detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss']
})
export class DetailHeaderComponent implements OnInit {
  @Input() article!:Article
 
  isOwner!:boolean;
  constructor(
    private router: Router,
    private userService: UserService,
    private authService:AuthenticationService,
    private articleService: DetailArticleService
  ) { 
  }

  ngOnInit() {
    this.authService.currentUser.subscribe((data:any)=>{
      if(data['user']?.username==this.article?.author?.username)
         this.isOwner=true;
    })
  }
  
  get currentArticle(): BehaviorSubject<Article> {
    return this.articleService.getCurrentArticle();
  }

  get clickedProfile(): BehaviorSubject<Profile> {
    return this.userService.getClickedProfile();
  }

  deleteArticle() {
    this.articleService.deleteArticle().subscribe(() => this.router.navigate(['home']) );
  }

}
