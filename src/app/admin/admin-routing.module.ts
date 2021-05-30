import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

const routes: Routes = [{
  path:"employees",
  component:EmployeelistComponent
},
{
  path:"timesheets",
  component:TimesheetComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
