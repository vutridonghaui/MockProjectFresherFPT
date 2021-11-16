import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/CoreModule/services/auth-service/authentication.service';
import { CommentService } from 'src/app/CoreModule/services/comment/comment.service';
import { UserService } from 'src/app/CoreModule/services/user/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  commentForm = new FormGroup({
    commentField: new FormControl('', Validators.required)
  })
  isLogined?:boolean; 
  currentUserImage :string='';
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private commentService: CommentService,
    private userService:UserService
  ) { 
    this.authService.currentUser.subscribe((x:any) =>{
      this.userService.getProfile(x['user']?.username).subscribe((data:any)=>{
        this.isLogined=true;
        this.currentUserImage=data['profile'].image;
      }) ;
    },error=>this.isLogined=false) ;
  }
  ngOnInit() {
    
  }
  addComment() {
    this.commentService.addComment(this.comment?.value).subscribe(
      value =>{
        console.log(value)
         this.commentForm.reset()
      }
    );
  }
  // get isAuthenticated() {
  //   return this.authService.isAuthenticated();
  // }
  get comment(){
    return this.commentForm.get('commentField');
  }
}
