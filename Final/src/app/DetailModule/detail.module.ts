import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../ShareModule';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { DetailArticleComponent } from './detail-article.component';
import { DetailHeaderComponent } from './detail-header/detail-header.component';
import { CommentComponent } from './comment/comment.component';
import { ListcommentComponent } from './listcomment/listcomment.component';
import { BodyComponent } from './body/body.component';
@NgModule({
  declarations: [
    DetailArticleComponent,
    DetailHeaderComponent,
    CommentComponent,
    ListcommentComponent,
    BodyComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ShareModule,
    FormsModule,
    RouterModule,
    LMarkdownEditorModule,
    MarkdownModule.forRoot()
    
  ],
  providers: [],
})
export class DetailModule { }