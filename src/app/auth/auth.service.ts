import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  public isAdmin = false;
  constructor(private router: Router, public afAuth: AngularFireAuth) {

  }

  public doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          this.router.navigate(['/dashboard']);
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  public doTwitterLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          this.router.navigate(['/dashboard']);
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  public doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
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
          this.router.navigate(['/dashboard']);
          resolve(res);
        }, err => reject(err))
    })
  }

  public doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut()
        this.router.navigate(['/login']);
        resolve();
      }
      else {
        reject();
      }
    });
  }

  public getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

}
