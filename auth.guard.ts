
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiserviceService } from 'src/app/shared/apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth: ApiserviceService, public router: Router) {}
  canActivate(): boolean {
    console.log("isauthentic",this.auth.isAuthenticated())
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  
  
  
}
}