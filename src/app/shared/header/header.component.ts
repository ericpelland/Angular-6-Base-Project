import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	public isAdmin = false;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
	  this.authService.checkAdminPriv((result) => {this.isAdmin = result})
  }

}
