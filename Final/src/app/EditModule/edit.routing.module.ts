import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailArticleComponent } from '../DetailModule/detail-article.component';
// import { AuthGuard } from '../CoreModule/services/auth-service/auth.guard';

// const routes: Routes = [{ path: ':slug', component: DetailArticleComponent }];

const routes: Routes =[];

 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }