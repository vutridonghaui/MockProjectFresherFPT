import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { PreviewArticleComponent } from './preview-article/preview-article.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AlertComponent } from './alert/alert.component';
import { ArticleHeaderComponent } from './article-header/article-header.component';
import { ButtonLikeComponent } from './button-like/button-like.component';
import { ButtonFollowComponent } from './button-follow/button-follow.component';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
 
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  declarations: [  
    HeaderComponent, FooterComponent, 
    ListArticleComponent, PreviewArticleComponent, 
    PaginationComponent, AlertComponent, ArticleHeaderComponent, 
    ButtonLikeComponent, ButtonFollowComponent, LoadingComponent
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HeaderComponent,
    ListArticleComponent, PreviewArticleComponent, 
    PaginationComponent, AlertComponent,ButtonFollowComponent,
    ArticleHeaderComponent,ButtonLikeComponent,LoadingComponent,FooterComponent
   
  ]
})
export class ShareModule {
}
 