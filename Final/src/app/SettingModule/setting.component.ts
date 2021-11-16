import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../CoreModule/interfaces/user.class';
import { AuthenticationService } from '../CoreModule/services/auth-service/authentication.service';
import { UserService } from '../CoreModule/services/user/user.service';
import { ConfirmPasswordValidator } from './custom-validator';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  currentUser = new User;
  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private userService:UserService
  ) { }
  ngOnInit() {

    this.authenticationService.currentUser.subscribe((data:any) => {
      this.currentUser=data['user'];
      });
   
  }

  

 


}
