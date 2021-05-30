import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { SharedModule } from '../shared/shared.module';
import { TimesheetComponent } from './timesheet/timesheet.component';


@NgModule({
  declarations: [EmployeelistComponent, TimesheetComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
