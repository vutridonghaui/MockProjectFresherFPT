import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailArticleService } from 'src/app/CoreModule/services/article/detail-article.service';
import { AuthenticationService } from 'src/app/CoreModule/services/auth-service/authentication.service';
import { Article } from '../../CoreModule/interfaces/article'
@Component({
  selector: 'app-button-like',
  templateUrl: './button-like.component.html',
  styleUrls: ['./button-like.component.scss']
})
export class ButtonLikeComponent implements OnInit {
  isLogined?:boolean
  @Input() article!:Article|any;
  @Input() text = '';
  constructor(
    private router: Router,
    private articleService: DetailArticleService,
    private authenticationService:AuthenticationService
  ) { }

  ngOnInit() {
    this.isLogined=this.authenticationService.isAuthenticated().value;
  }
  toggleFavorited() {
    if(!this.isLogined) this.router.navigate(['login']);
    if (!this.article.favorited) {
      this.articleService.favoriteArticle(this.article.slug).subscribe(value => {
        this.article = this.articleService.currentArticleSubject.value;
      })
    } else {
      this.articleService.unfavoriteArticle(this.article.slug).subscribe( value => {
        this.article = this.articleService.currentArticleSubject.value;
      })
    }
  }
}
