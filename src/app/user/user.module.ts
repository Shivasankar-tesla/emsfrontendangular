import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UsertimesheetComponent } from './usertimesheet/usertimesheet.component';
import { UserleaveComponent } from '../userleave/userleave.component';


@NgModule({
  declarations: [ UserprofileComponent, UsertimesheetComponent, UserleaveComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
