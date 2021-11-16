import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/CoreModule/services/alert/alert.service';
import { AuthenticationService } from 'src/app/CoreModule/services/auth-service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  img:String="assets/images/log.svg";
  returnUrl!: string;
  loginForm!:FormGroup;
  loading = false;
  error = '';
  constructor(public router:Router,
    public activeRoute:ActivatedRoute,public fb:FormBuilder, 
    public authenticationService:AuthenticationService,private alertService:AlertService) {
    if (this.authenticationService.currentUserValue?.username) { 
      this.router.navigate(['/home']);
    }
   }

  ngOnInit(): void {
    this.createForm();
    this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/home';
  }

  public createForm(){
    this.loginForm=this.fb.group(
      {
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]]
      }
    )
  }
  public get f(){
    return this.loginForm.controls;
  }

  public movetoSignup(){
    this.router.navigate(["/register"]);
  }
  public saveloginForm(){
    this.authenticationService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              this.alertService.error('Login successfully',false);
                this.router.navigate([this.returnUrl]);
                // [this.returnUrl]
            },
            error => {
              this.alertService.error('Email or Password is incorrect');
                this.error = error;
                this.loading = false;
            });
  }

}
