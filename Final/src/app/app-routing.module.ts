import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './AuthModule/login/login.component';
import { SignupComponent } from './AuthModule/signup/signup.component';
import { AuthGuard } from './CoreModule/services/auth-service/auth.guard';
import { NotloggedGuard } from './CoreModule/services/auth-service/notlogged.guard';
import { DetailArticleComponent } from './DetailModule/detail-article.component';
import { EditComponent } from './EditModule/edit.component';
import { PostComponent } from './EditModule/post/post.component';
import { FeedComponent } from './HomeModule/feed/feed.component';
import { HomeComponent } from './HomeModule/home.component';
import { ProfileComponent } from './ProfileModule/profile.component';
import { SettingComponent } from './SettingModule/setting.component';
import { UpdatePasswordComponent } from './SettingModule/update-password/update-password.component';
import { UpdateProfileComponent } from './SettingModule/update-profile/update-profile.component';
import { ListArticleComponent } from './ShareModule';

const routes: Routes = [
  { path: 'home', component: HomeComponent ,
  children:[
    {path: '', redirectTo: 'feed', pathMatch: 'full'},
    { path: 'global', component: ListArticleComponent },
    { path: 'feed', component: FeedComponent },
    {path: 'tags/:tag', component: ListArticleComponent }
  ]
},
  { path: 'login', component: LoginComponent},
  {
    path:'register',
    component:SignupComponent
  },
  { path: 'profile/:user/:filter',component:ProfileComponent},
  { path: 'profile/:user', redirectTo: 'profile/:user/author', pathMatch: 'full' },
  {path:'setting',component:SettingComponent,canActivate:[AuthGuard],
  children:[
    {
      path:'update-profile',
      component:UpdateProfileComponent
    },
    {
      path:'update-password',
      component:UpdatePasswordComponent
    },
    {path: '', redirectTo: 'update-profile', pathMatch: 'full'},
  ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path:'edit/:slug',
    component:EditComponent,
    canActivate:[AuthGuard],
    
  },
  {
    path:'post',
    component:PostComponent,
    canActivate:[AuthGuard],
  },
  {path: 'articles/:slug', component: DetailArticleComponent }

  //, canActivate:[NotloggedGuard]


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
