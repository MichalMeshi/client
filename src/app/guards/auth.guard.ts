import { AuthService } from './../services/auth.service';
import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
class AuthGuard {
  constructor(private auth: AuthService, private router: Router, private toast: NgToastService) { }
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true
    } else {
      this.toast.error({ detail: "ERROR", summary: "Please Login First!" });
      this.router.navigate(['login'])
      return false;
    }
  }

}
export const IsAuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean => {
  return inject(AuthGuard).canActivate();
}