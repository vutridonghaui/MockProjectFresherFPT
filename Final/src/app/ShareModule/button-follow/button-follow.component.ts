import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/CoreModule/interfaces/profile';
import { AuthenticationService } from 'src/app/CoreModule/services/auth-service/authentication.service';
import { UserService } from 'src/app/CoreModule/services/user/user.service';

@Component({
  selector: 'app-button-follow',
  templateUrl: './button-follow.component.html',
  styleUrls: ['./button-follow.component.scss']
})
export class ButtonFollowComponent implements OnInit {

  @Input('userProfile') profileInput!: Profile|any;
  isLogined?:boolean;
  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService:AuthenticationService
  ) { }

  ngOnInit() {
   this.userService.setClickedProfile(this.profileInput)
   this.isLogined=this.authenticationService.isAuthenticated().value
  
  }
  get profile() {
    return this.userService.getClickedProfile().value;
  }
  followUser() {
    if(!this.isLogined) this.router.navigate(['login']);
    this.userService.followUser(this.profileInput.username).subscribe(data=>{
      console.log(data);
    });
  }
  
  unfollowUser() {
    this.userService.unfollowUser(this.profileInput.username).subscribe(data=>{
      console.log(data)
    });
  }

}
