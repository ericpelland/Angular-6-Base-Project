import { Component } from '@angular/core';
import { AuthService } from '../auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatsService } from '../../stats/stats.service';
import { ErrorService } from '../../error/error.service';
import { DatabaseService } from '../../database/database.service';
import { User } from '../../interfaces/user';

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
    private databaseService: DatabaseService,
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

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        this.registrationSuccessful(res.user)
      }, err => this.handleError(err)
      )
  }

  tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        this.registrationSuccessful(res.user)
      }, err => this.handleError(err)
      )
  }

  private registrationSuccessful(user) {
    let userId = user.uid;
    let email = user.email;
    // TODO: check that user has not been logged. if they have add a log for logging in
    this.databaseService.getCollection('users', 'userId', '==', userId, data => {
      if (data.length == 0) {
        this.statsService.insertStat('register', '1', userId);
        let document: User = {
          role: 'user',
          userId: userId,
          email: email,
          registerTime: new Date().getTime().toString()
        };
        this.databaseService.addDocument('users', document, null);
      }
    });

    this.router.navigate(['/dashboard']);
  }

  private handleError(error) {
    this.successMessage = "";
    this.errorMessage = error.message;
    this.errorService.logError(error);
  }

}
