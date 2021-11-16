import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../CoreModule/interfaces/article';
import { Profile } from '../CoreModule/interfaces/profile';
import { User } from '../CoreModule/interfaces/user.class';
import { AuthenticationService } from '../CoreModule/services/auth-service/authentication.service';
import { UserService } from '../CoreModule/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  defaultImage="assets/images/profile-blank-whitebg.png"
  userProfile= new Profile;
  currentUser=new User;
  bio?:string;
  isLogin?:boolean
  constructor(private userService:UserService,
    private activeRoute:ActivatedRoute,
    private authenticationService:AuthenticationService) { 
      this.authenticationService.currentUser.subscribe((x:any) =>{
        this.currentUser = x['user'];
        this.isLogin=true;
      },
      error=>this.isLogin=false) 
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(data=>{
      this.userService.getProfile(data['user']).subscribe((res:any)=>{
        this.userProfile=res['profile'];
       this.bio=this.userProfile?.bio
      })
    })
    
  }
  

}
