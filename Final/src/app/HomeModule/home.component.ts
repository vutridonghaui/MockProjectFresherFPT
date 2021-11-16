import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../CoreModule/interfaces/article';
import { User } from '../CoreModule/interfaces/user.class';
import { ArticleService } from '../CoreModule/services/article/article.service';
import { DetailArticleService } from '../CoreModule/services/article/detail-article.service';
import { AuthenticationService } from '../CoreModule/services/auth-service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,AfterContentChecked {
  yourFeedChosen: boolean = false;
  loadingTags: boolean = true;
  tags: string[]=[];
  currentTag!: string
  currentUser= new User;
  constructor(private authenticationService:AuthenticationService,private router: Router,
    private articleService: ArticleService,private activeRoute:ActivatedRoute,
    private cdref: ChangeDetectorRef
    ) { 
    this.authenticationService.currentUser.subscribe((data:any)=>{
      this.currentUser=data['user'];
    })
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(data=>{
    })
    this.articleService.getTags().subscribe((value:any)=> {
      this.loadingTags = false;
      this.tags = value['tags'];
    });
    this.articleService.newtag.subscribe(data=>{
      this.currentTag=data;
    })
    if (!this.authenticationService.isAuthenticated().value) {
      this.router.navigate(['home/global'])
    }
  }
  getTag(tag: string) {
    this.articleService.setTag(tag);
    this.articleService.setFilter('tag');
    this.currentTag = tag;
  }

  isActive(instruction: any[]): boolean {
    // Set the second parameter to true if you want to require an exact match.
    return this.router.isActive(this.router.createUrlTree(instruction), false);
  }
  get isAuthenticated(): BehaviorSubject<boolean> {
    return this.authenticationService.isAuthenticated();
  }
  ngAfterContentChecked() {

    this.cdref.detectChanges();

  }
}
