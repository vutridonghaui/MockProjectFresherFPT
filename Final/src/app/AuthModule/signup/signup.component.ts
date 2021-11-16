import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Profile } from 'src/app/CoreModule/interfaces/profile';
import { AlertService } from 'src/app/CoreModule/services/alert/alert.service';
import { MessageService } from 'src/app/CoreModule/services/auth-service/message.service';
import { UserService } from 'src/app/CoreModule/services/user/user.service';
import { ConfirmPasswordValidator } from './password.validator';
import { ValidateUsername } from './username.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  img:string="assets/images/register.svg";
  validateUsername:boolean=false;
  signupForm!:FormGroup;
  constructor(public router:Router,public fb:FormBuilder,
    public messageService:MessageService,
    public userService:UserService,
    public alertSerive:AlertService,
    public customValidator:ValidateUsername
    ) { }

  ngOnInit(): void {
    this.createForm();
  }
  public createForm(){
    this.signupForm=this.fb.group({
      username:['', [Validators.required, this.validatorUsername()]],
      // username:['',[Validators.required,this.customValidator. validatorUsername()]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required,Validators.minLength(6)]]
    },{
      validators: [ConfirmPasswordValidator('password', 'confirmPassword')]
    })
  }
  public movetoSignin(){
    this.router.navigate(['/login']);
  }
  public get f(){
    return this.signupForm.controls;
  }
  public savesignupForm(){
    this.userService.register(this.signupForm.value)
        .pipe(first())
        .subscribe(
            data => {
                this.alertSerive.success('Registration success!!!');
                this.router.navigate(['/login']);
            },
            error => {
                this.alertSerive.error("Email has already existed !!!");
            });
  }
  private validatorUsername(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean}|any => {
      if(control.value && control.valueChanges){
        this.userService.checkUsername(control.value)
        .subscribe(
          (data:any) => {
            // if(control)
            let res: string = data['profile']?.username;
            console.log(control)
            if (res) {
              control.setErrors({'userExist': true});
              return {'userExist': true};
            } else {
              return null
            }
          },
          (error) => {
           
          }
        )
      }
      else return null;
      
    }
  }
  
}
