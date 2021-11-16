import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './setting.routing.module';
// import { SettingsComponent } from './settings.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SettingComponent } from './setting.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { BrowserModule } from '@angular/platform-browser';
// import { SharedModule } from '../../shared-component/shared.module';


@NgModule({
  declarations: [
    SettingComponent,
    UpdateProfileComponent,
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule
  ],
  providers: []
})
export class SettingsModule { }
