import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommentService } from 'src/app/CoreModule/services/comment/comment.service';
import { Comment } from 'src/app/CoreModule/interfaces/comment.class';
import { UserService } from 'src/app/CoreModule/services/user/user.service';
@Component({
  selector: 'app-listcomment',
  templateUrl: './listcomment.component.html',
  styleUrls: ['./listcomment.component.scss']
})
export class ListcommentComponent implements OnInit {
  
  slug = '';
  isOwnerComment?:boolean;
  listComment:Comment[]=[];
  isLogin?:boolean;
  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((data:any)=>{
      this.slug=data['slug'];
      this.commentService.getCommentsList(this.slug).subscribe(data=>{
        this.listComment=data;
        this.listComment.forEach((ele:Comment,index)=>{
          this.userService.getProfile(ele?.author?.username).subscribe((data:any)=>{
            this.listComment[index].author.image=data['profile'].image;
          })
        })
       
        // this.userService.getProfile()
        console.log(data);
      });
    })
    this.userService.getCurrentUser().subscribe(
      data=> this.isLogin=true,
      error=>this.isLogin=false
    )
    
  }
  isOwner(comment: Comment) {
    if(this.isLogin) return this.commentService.isOwner(comment);
    
    
  }

  deleteComment(index: any,comment: Comment) {
    this.commentService.deleteComment(comment._id, index).subscribe((data:any)=>{
      console.log(data)
    });
  }

}
