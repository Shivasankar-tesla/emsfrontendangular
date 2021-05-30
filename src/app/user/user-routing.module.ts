import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UsertimesheetComponent } from './usertimesheet/usertimesheet.component';

const routes: Routes = [
  {
    path:"editProfile",
    component:EditProfileComponent
  },
  {
    path:"timesheet",
    component:UsertimesheetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
