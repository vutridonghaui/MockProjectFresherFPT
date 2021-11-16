import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/CoreModule/services/auth-service/authentication.service';
import { User } from 'src/app/CoreModule/interfaces/user.class';
import { UserService } from 'src/app/CoreModule/services/user/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  defaultImage="assets/images/profile-blank-whitebg.png";
  avatar:string='';
  currentUser=new User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService:UserService) {
    this.authenticationService.currentUser.subscribe((x:any) =>{
       this.currentUser = x['user'];
       if(x['user']?.username){
        this.userService.getProfile(x['user']?.username).subscribe((data:any)=>{
          this.avatar= data["profile"]?.image;
        })
       }
      
    });
    
   }

  ngOnInit(): void {
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

}
