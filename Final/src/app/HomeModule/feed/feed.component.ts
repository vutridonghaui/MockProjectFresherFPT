import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/CoreModule/interfaces/article';
import { ArticleService } from 'src/app/CoreModule/services/article/article.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  isShow!: boolean;
  topPosToStartShowing = 100;
  loadingArticles: boolean = true;
  currentPage!: number;
  articles: Article[] = [] 
  constructor(
    private router: Router,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    this.currentPage = 1;
    this.onPageChanged(this.currentPage);
    if(this.router.url=='/home/feed') this.articleService.setTag('')
  }

  onPageChanged(page: number) {
    this.loadingArticles = true;
    this.articles = [];
    this. articleService.getFeed(page).subscribe(value => {
      this.loadingArticles = false;
      this.articles = value;
    });
  }
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
