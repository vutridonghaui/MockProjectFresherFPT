import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public authenticationService:AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let requestOption:any = {};
     
    if(this.authenticationService.isAuthenticated().getValue()) {
      
      requestOption.setHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.authenticationService.getToken()}`
      }
    } 
    // Clone the request and set the new header in one step.
    request = request.clone(requestOption); 
    return next.handle(request)
  }
}
