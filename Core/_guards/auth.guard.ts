import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../_providers/api-service/api.service';
import * as alertify from 'alertifyjs'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  key: string | null | undefined;

  constructor(private apiSrvc: ApiService, private router: Router) { }
  canActivate(_route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('check') == 'true') {
      this.key = localStorage.getItem('key');
      if (this.key === null) {
        this.router.navigate(['']);
        alertify.error('You are not authorised to access this page');
        return false;
      }
      else {
        return true;
      }
    }
    else {
      if (!this.apiSrvc.loggedIn()) {
        this.router.navigateByUrl('');
        alertify.error('You are not authorised to access this page');
      }
      return this.apiSrvc.loggedIn();
    }
  }

}
