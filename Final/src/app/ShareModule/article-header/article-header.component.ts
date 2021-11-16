import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/CoreModule/interfaces/article';

@Component({
  selector: 'app-article-header',
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss']
})
export class ArticleHeaderComponent implements OnInit {
  @Input() article!: Article|null;
  constructor() { }

  ngOnInit() {
  }

}
