import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebase;
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ErrorService } from './error/error.service';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { DatabaseService } from './database/database.service';
import { StatsService } from './stats/stats.service';
import { StatsComponent } from './layouts/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StatsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    DatabaseService,
    ErrorService,
    StatsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
