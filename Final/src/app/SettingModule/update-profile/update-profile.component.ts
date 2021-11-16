import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/CoreModule/interfaces/user.class';
import { AuthenticationService } from 'src/app/CoreModule/services/auth-service/authentication.service';
import { UserService } from 'src/app/CoreModule/services/user/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  currentUser = new User;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService:UserService
  ) { }
  updateForm = this.fb.group({
    username: [this.currentUser.username, [Validators.required]],
    email: [this.currentUser.email, [Validators.required, Validators.email]],
    image: [this.currentUser.image],
    bio: [this.currentUser.bio]})
  errorMessages = [];

  get username() {
    return this.updateForm?.get('username');
  }
  get email() {
    return this.updateForm?.get('email');
  }
  get image() {
    return this.updateForm?.get('image');
  }
  get bio() {
    return this.updateForm?.get('bio');
  }
  ngOnInit() {
    this.authenticationService.currentUser.subscribe((data:any)=>{
        this.image?.setValue(data['user']?.image);
        this.username?.setValue(data['user']?.username);
        this.email?.setValue(data['user']?.email);
        this.bio?.setValue(data['user']?.bio);
        if(data['user']?.image==undefined){
          this.userService.getProfile(data['user']?.username).subscribe((res:any)=>{
            this.image?.setValue(res['profile'].image)
           console.log(res)
         })
        }
        
    })
   
  }

  updateUser() {
    this.currentUser = {
      username: this.username?.value,
      email: this.email?.value,
      image: this.image?.value,
      bio: this.bio?.value
    };
    this.authenticationService.updateUser(this.currentUser).subscribe(
      user => this.router.navigate(['/profile',this.currentUser.username]),
    )
    console.log(this.currentUser);
  }


}
