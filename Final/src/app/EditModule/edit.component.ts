import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadResult, MdEditorOption } from "ngx-markdown-editor";
import { Article } from '../CoreModule/interfaces/article';
import { DetailArticleService } from '../CoreModule/services/article/detail-article.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  items :string[]=[];
  content:any;
  title!:string;
  description!:string;
  slug = '';
  error!: Object;
  constructor(private articleService: DetailArticleService,
    private activeRoute:ActivatedRoute, private router:Router) {
    
  }
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if(params['slug']) {
       this.slug = params['slug'];
       this.articleService.getArticleBySlug(params['slug']).subscribe(
         value => {
           this.title=value.title;
           this.description=value.description;
           this.content=value.body;
           this.items = value.tagList;
         }
       )
      }
    });
  }

  public handleForm(ngForm: NgForm, nameControl: any): void {
    // console.log(nameControl);
    if (ngForm.invalid) {
      alert('Form is invalid');
      return;
    }
    let article={
      "title":this.title,
      "description":this.description,
      "body":this.content,
      "tagList":this.items
    }
    
    alert('Form is submitted');
    this.articleService.updateArticle(article, this.slug).subscribe(
      (data:any)=>this.router.navigate(['/articles',data['article'].slug]),
        error => this.error = error
    )
    
  
  
  console.log(ngForm.value)
  }
 
// .pipe(
  // map((data:any) => data['article'])
  // )
}
