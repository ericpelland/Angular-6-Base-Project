import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public login() {
      let username = (<HTMLInputElement>document.getElementById('username')).value;
      let password = (<HTMLInputElement>document.getElementById('password')).value;
      this.authService.login(username,password);
  }

}
