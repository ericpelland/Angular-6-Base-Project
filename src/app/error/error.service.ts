import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { StatsService } from '../stats/stats.service';
import { Error } from '../interfaces/error';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private databaseService: DatabaseService, private statsService: StatsService) { }

  public logError(error:any) {
    console.log('Error: ');
    console.log(error);
	let errorString;
	if(error.errorMessage) {
		errorString = error.errorMessage;
	} else {
		errorString = error.toString();
	}
    let document:Error = {
      'error': errorString,
      'userId': '',
	  'time': new Date().getTime().toString()
    };
    this.databaseService.addDocument('errors', document, function() {
      console.log('Error Added');
    });
    this.statsService.insertStat('login', '1');
  }
}
