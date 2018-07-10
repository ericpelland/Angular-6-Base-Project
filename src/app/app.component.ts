import { Component } from '@angular/core';
import { DatabaseService } from './database/database.service';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private databaseService:DatabaseService, private authService:AuthService) { }
}
