import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuthService {
  public isAdmin = false;
  public user;
  public isLoggedIn = false;
  constructor(private databaseService: DatabaseService, private router: Router, public afAuth: AngularFireAuth) {

  }

  public doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          this.isLoggedIn = true;
          this.router.navigate(['/dashboard']);
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  public doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.router.navigate(['/dashboard']);
          resolve(res);
        }, err => reject(err))
    })
  }

  public doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.isLoggedIn = true;
          this.router.navigate(['/dashboard']);
          resolve(res);
        }, err => reject(err))
    })
  }

  public doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut()
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
        resolve();
      }
      else {
        reject();
      }
    });
  }

  public checkAdminPriv(callback) {
    this.databaseService.getCollection('users', 'userId', '==', this.user.uid, data => {
      if (data.length > 0) {
        if (data[0].role == 'admin') {
          callback(true);
          return;
        }
      }
      callback(false);
    });
  }

  public getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.isLoggedIn = true;
          this.user = user;
          this.checkAdminPriv(function (result) {
            this.isAdmin = result;
            resolve(user);
          }.bind(this))
        } else {
          this.isLoggedIn = false;
          this.user = null;
          this.isAdmin = false;
          reject('No user logged in');
        }
      })
    })
  }

}
