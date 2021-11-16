import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { ProfileRoutingModule } from './profile.routing.module';
import { ProfileComponent } from './profile.component';
import { ShareModule } from '../ShareModule';

import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
  
    ProfileComponent,
   
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ShareModule,
    RouterModule,
    ProfileRoutingModule
  ],
  providers: [],
})
export class ProfileModule { }