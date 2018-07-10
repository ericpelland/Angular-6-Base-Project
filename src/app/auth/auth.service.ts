import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private router: Router) { }

  public authenticated = false;

  public login(username, password) {
      if(username == "admin" && password == "password") {
          this.authenticated = true;
          this.router.navigate(['/dashboard']);
      }
  }

}
