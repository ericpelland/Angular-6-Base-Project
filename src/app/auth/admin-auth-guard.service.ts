import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser()
        .then(user => {
          this.authService.checkAdminPriv(function (admin) {
            return resolve(admin);
          })
        }, err => {
          this.router.navigate(['/login']);
          return resolve(false);
        })
    })
  }
}