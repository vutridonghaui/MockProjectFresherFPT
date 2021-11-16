import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../CoreModule/services/auth-service/auth.guard';
import { ListArticleComponent } from '../ShareModule';
import { FeedComponent } from './feed/feed.component';
import { HomeComponent } from './home.component';

const routes: Routes =[];
// const routes: Routes = [{ path: '', component: HomeComponent, children: [
//   {path: '', redirectTo: 'global', pathMatch: 'full'},
//   { path: 'global', component: ListArticleComponent },
//   { path: 'feed', component: FeedComponent },
//   { path: 'tag/:value', component: ListArticleComponent }
// ] }];
// const routes: Routes = [{ path: '', component: HomeComponent, children: [
//   {path: '', redirectTo: 'global', pathMatch: 'full'},
//   { path: 'global', component: ListArticleComponent },
//   { path: 'feed', component: FeedComponent },
//   // { path: 'tag/:value', component: ArticlesListComponent }
// ] }];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }