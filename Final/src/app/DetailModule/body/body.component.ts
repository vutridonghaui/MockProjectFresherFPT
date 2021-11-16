import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/CoreModule/services/article/article.service';
import { DetailArticleService } from 'src/app/CoreModule/services/article/detail-article.service';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  body:string='';
  tagList = []
  constructor(
    private detailArticleService: DetailArticleService,
    private articleService:ArticleService
  ) { }

  ngOnInit() {
    this.detailArticleService.getCurrentArticle().subscribe((content:any) => {
      this.body = content.body;
      this.tagList = content.tagList;
    })
  }

  sendTag(tag:string){
    this.articleService.setTag(tag)
  }

}
