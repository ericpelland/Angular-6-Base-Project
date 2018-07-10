import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebase;
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SettingsComponent } from './layouts/settings/settings.component';
import { ErrorComponent } from './error/error.component';
import { StatsComponent } from './stats/stats.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { DatabaseService } from './database/database.service';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ErrorComponent,
    StatsComponent,
    SpinnerComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    DatabaseService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
