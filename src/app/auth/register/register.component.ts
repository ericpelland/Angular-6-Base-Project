import { Component } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatsService } from '../../stats/stats.service';
import { ErrorService } from '../../error/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private statsService: StatsService,
    private errorService: ErrorService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin()
      .then(res => {
        this.registrationSuccessful()
      }, err => this.handleError(err)
      )
  }

  tryTwitterLogin() {
    this.authService.doTwitterLogin()
      .then(res => {
        this.registrationSuccessful()
      }, err => this.handleError(err)
      )
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        this.registrationSuccessful()
      }, err => this.handleError(err)
      )
  }

  tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        this.registrationSuccessful()
      }, err => this.handleError(err)
  	)
  }

  private registrationSuccessful() {
    // TODO: check that user has not been logged. if they have add a log for logging in
    this.statsService.insertStat('register', '1');
    this.errorMessage = "";
    this.successMessage = "Your account has been created, redirecting.";
    setTimeout(function() {
      this.router.navigate(['/dashboard']);
    }, 500);
  }

  private handleError(error) {
    this.successMessage = "";
    this.errorMessage = error.message;
    this.errorService.logError(error);
  }

}
