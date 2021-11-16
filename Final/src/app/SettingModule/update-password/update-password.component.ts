import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/CoreModule/interfaces/user.class';
import { AuthenticationService } from 'src/app/CoreModule/services/auth-service/authentication.service';
import { UserService } from 'src/app/CoreModule/services/user/user.service';
import {  ConfirmPasswordValidator} from '../custom-validator';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {

  currentUser = new User;
  currentpassword:string='';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService:UserService
  ) { }
  passwordForm = this.fb.group({
    password: ['', [Validators.required,this.validatorPassword()]],
    newpassword: ['', [Validators.required,Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required,Validators.minLength(6)]],
   },{
      validators: [ConfirmPasswordValidator('newpassword', 'confirmPassword')]
    })
  
  errorMessages = [];
  get password() {
    return this.passwordForm?.get('password');
  }
  get newpassword() {
    return this.passwordForm?.get('newpassword');
  }
  get confirmPassword() {
    return this.passwordForm?.get('confirmPassword');
  }

  ngOnInit() {
    this.userService.getUser().subscribe((data:any)=>{
      this.currentUser=data['user'];
      this.currentUser.password=this.authenticationService.getPassword();
      this.currentpassword=this.authenticationService.getPassword();
    })
    
    
  }

  updateUser() {
    this.currentUser = {
      username: this.currentUser.username,
      email: this.currentUser.email,
      image: this.currentUser.image,
      bio: this.currentUser.bio,
      password :this.newpassword?.value
    
    };
    
    this.authenticationService.updateUser(this.currentUser).subscribe(
      (data:any) =>{
        this.router.navigate(['/profile']);
        if(data['user'].username==this.currentUser.username)
        localStorage.setItem('password',JSON.stringify(this.currentUser.password));
      })
  }
  private validatorPassword(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean}|any => {
      if(control.value && control.valueChanges){
        setTimeout(():any=>{
          if(this.currentpassword !=control.value){
            control.setErrors({'wrongpassword': true});
              // return {'Wrong Password': true};
          }
          else return null;
        },500)
      }
      else return null;
      
    }
  }

}
