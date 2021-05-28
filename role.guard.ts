import { AuthGuard } from './auth.guard';
import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import decode from 'jwt-decode';
import { ApiserviceService } from 'src/app/shared/apiservice.service';
@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(public auth: ApiserviceService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole; // get expected roled from routing guard
    const token = localStorage.getItem('token') || "";
    // decode the token to get its payload
    const tokenPayload:any = decode(token);
    console.log(tokenPayload.role);
    if (
      !this.auth.isAuthenticated() || 
      tokenPayload.role !== expectedRole
    ) {
      this.router.navigate(['/error']);
      return false;
    }
    return true;
  }
}
