import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../database/database.service';
import { Error } from '../../interfaces/error';
import { User } from '../../interfaces/user';
import { Stat } from '../../interfaces/stat';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  private errors = [];
  private users = [];
  private stats = [];
  constructor(private databaseService: DatabaseService) { }

  getStats() {
    this.databaseService.getDocuments('errors').subscribe(errors => {
      this.errors = errors;
    });
    this.databaseService.getDocuments('users').subscribe(users => {
      this.users = users;
    });
    this.databaseService.getDocuments('stats').subscribe(stats => {
      this.stats = stats;
    });
  }

  ngOnInit() {
    this.getStats();
  }

}
