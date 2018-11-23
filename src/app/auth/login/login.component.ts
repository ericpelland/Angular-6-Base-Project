import { Component } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatsService } from '../../stats/stats.service';
import { ErrorService } from '../../error/error.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private statsService: StatsService,
    private router: Router,
    private errorService: ErrorService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        this.loginSuccessful(res.user.uid);
      }), err => {
        this.handleError(err);
      }
  }

  tryLogin(value) {
    this.authService.doLogin(value)
      .then(res => {
        this.loginSuccessful(res.user.uid);
      }, err => {
        this.handleError(err);
      })
  }

  private handleError(error) {
    this.errorMessage = error.message;
    this.errorService.logError(error);
  }

  private loginSuccessful(userId) {
    this.statsService.insertStat('login', '1', userId);
    this.router.navigate(['/dashboard']);
  }
}
