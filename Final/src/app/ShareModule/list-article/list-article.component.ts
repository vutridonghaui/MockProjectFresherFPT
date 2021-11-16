import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/CoreModule/interfaces/article';
import { User } from 'src/app/CoreModule/interfaces/user.class';
import { ArticleService } from 'src/app/CoreModule/services/article/article.service';
import { AuthenticationService } from 'src/app/CoreModule/services/auth-service/authentication.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {
  loadingArticles: boolean = true;
  currentPage!: number;
  articles: Article[] = [];
  filterValue = '';
  filterName="";
  currentUser?:User;
  isShow!: boolean;
  topPosToStartShowing = 100;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private authenticationService:AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe((x:any) =>{
      this.currentUser = x['user'];
    })
   }

  ngOnInit() {
    this.currentPage = 1;
    this.route.params.subscribe((params: any) => {
      if(params?.user){
        this.filterValue = params?.user;
        this.articleService.setFilter(params.filter);
        console.log(params)
      }
      else if(params?.tag){
        this.filterValue = params.tag;
        this.articleService.setFilter('tag');
        this.articleService.setTag(params.tag);
        
      }
      if(this.router.url=='/home/global') this.articleService.setTag('')
      // this.articleService.newtag.subscribe(data=>{
      //     this.filterValue=data;
      //   })
    this.onPageChanged(this.currentPage);
    })
  }

  onPageChanged(page: number) {
    
    this.loadingArticles = true;
    this.articles = [];
    this.articleService.getArticlesWithFilter(page, this.filterValue).subscribe(value => {
      this.currentPage = page;
      this.loadingArticles = false;
      this.articles = value;
    });
    
  }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // console.log('[scroll]', scrollPosition);
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
