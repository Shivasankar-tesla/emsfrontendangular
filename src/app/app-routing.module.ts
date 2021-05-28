import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'auth.guard';
import { RoleGuard } from 'role.guard';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path:"",
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    "path":"admin",
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),

     canActivate:[AuthGuard,RoleGuard],
     data:{"expectedRole":"admin"}
  },
  
  {
    "path":"user",
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
     canActivate:[AuthGuard,RoleGuard],
     data:{"expectedRole":"user"}
  },
  {
    "path":"error",
    component:ErrorComponent

  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
