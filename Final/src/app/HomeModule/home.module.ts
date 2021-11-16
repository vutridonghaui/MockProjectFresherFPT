import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routing.module';
import { RouterModule } from '@angular/router';
import { PreviewArticleComponent, ShareModule } from '../ShareModule';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { FeedComponent } from './feed/feed.component';


 
@NgModule({
  declarations: [
    // TagListComponent,
    // ArticlesListComponent
    HomeComponent,
    FeedComponent,
  

  ],
  imports: [
    BrowserModule,
    CommonModule,
    ShareModule,
    RouterModule,
    HomeRoutingModule,
  ],
  providers: [],
})
export class HomeModule { }