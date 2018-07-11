import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private databaseService: DatabaseService) { }

  public insertStat(statName, value, userId = '') {
    let document = {
      'statName': statName,
      'value': value,
      'userId': userId,
	  'time': new Date().getTime().toString()
    };
    this.databaseService.addDocument('stats', document, function() {
      console.log('stat Added');
    })
  }

}
