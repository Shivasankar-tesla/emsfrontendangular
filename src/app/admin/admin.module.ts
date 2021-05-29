import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [EmployeelistComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
