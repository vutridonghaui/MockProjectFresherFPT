import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/CoreModule/interfaces/article';
import { ArticleService } from 'src/app/CoreModule/services/article/article.service';
import { CommentService } from 'src/app/CoreModule/services/comment/comment.service';

@Component({
  selector: 'app-preview-article',
  templateUrl: './preview-article.component.html',
  styleUrls: ['./preview-article.component.scss']
})
export class PreviewArticleComponent implements OnInit {

  @Input() article!: Article;
  comments:number=0;
  constructor(
    private router: Router,
    private articleService:ArticleService,
    private commentSevice:CommentService
  ) { }

  ngOnInit() {
    this.commentSevice.getCommentsList(this.article.slug).subscribe(
      (data:any)=>this.comments=data.length
    )
  }
  sendTag(tag:string){
    this.articleService.setTag(tag)
  }
}
