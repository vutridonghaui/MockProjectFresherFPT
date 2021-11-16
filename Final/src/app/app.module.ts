import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './AuthModule';
import { JwtInterceptor } from './CoreModule/services/auth-service';
import { HomeModule } from './HomeModule';
import { ProfileModule } from './ProfileModule';
import { SettingsModule } from './SettingModule';
import { ShareModule } from './ShareModule';
import { HighlightDirective } from './CoreModule/directives/highlight.directive';
import { RouterModule } from '@angular/router';
import { EditModule } from './EditModule';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { DetailModule } from './DetailModule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ShareModule,
    AuthModule,
    ProfileModule,
    HomeModule,
    SettingsModule,
    RouterModule,
    EditModule,
    DetailModule,
    LMarkdownEditorModule ,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
