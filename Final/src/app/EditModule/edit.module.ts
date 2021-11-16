import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../ShareModule';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { EditRoutingModule } from './edit.routing.module';
import { EditComponent } from './edit.component';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { PostComponent } from './post/post.component';
@NgModule({
  declarations: [
    EditComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ShareModule,
    FormsModule,
    RouterModule,
    LMarkdownEditorModule,
    MarkdownModule.forRoot(),
    TagInputModule,
    BrowserAnimationsModule,
    EditRoutingModule,

  ],
  providers: [],
})
export class EditModule { }