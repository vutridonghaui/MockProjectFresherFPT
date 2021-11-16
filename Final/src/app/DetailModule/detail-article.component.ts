import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../CoreModule/interfaces/profile';
import { Article } from '../CoreModule/interfaces/article';
import { AuthenticationService } from '../CoreModule/services/auth-service/authentication.service';
import { UserService } from '../CoreModule/services/user/user.service';
import { DetailArticleService } from '../CoreModule/services/article/detail-article.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {
  isLogined?:boolean;
  article!:Article;
  // currentUsername:any;
  author = new Profile;
  isOwner:boolean=false;
  favBtnText = "Favorite Post";
  isShow:boolean=false;
  currentarticle?:Article;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private articleService: DetailArticleService
  ) { 

    this.articleService.newcurrentArticle.subscribe(data=>{
      this.currentarticle=data;
    })
  }

  ngOnInit() {
    this.route.params.subscribe((params:any) => {
      this.articleService.getArticleBySlug(params['slug']).subscribe(
        (data:any) => {
          this.article = data;
          this.author = data.author;
          this.userService.setClickedProfile(this.author);
        }
      )
    })
    
    // this.authenticationService.currentUser.subscribe((data:any)=>{
    //   if(data['user']?.username==this.article?.author?.username)
    //      this.isOwner=true;
    // }
    // )
    console.log(this.isOwner)
  }
  showComment(){
    this.isShow=!this.isShow;
  }

}
