import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DetailArticleService } from 'src/app/CoreModule/services/article/detail-article.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  items :string[]=[];
  content:any;
  title!:string;
  description!:string;
  error!: Object;
  constructor(private articleService: DetailArticleService,
     private router:Router) { }

  ngOnInit(): void {
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
    
      this.articleService.createArticle(article).subscribe(
        (data:any)=>{
          this.router.navigate(['/articles', data['article'].slug])
         }, (error :any)=> this.error = error
      )
      alert('Form is submitted');
    
    
    console.log(ngForm.value)
  }
//  .pipe(
  // map((data:any)=> data['article'])
  // )

}
