import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule
	],
	exports: [
		LoginComponent,
		RegisterComponent
	],
	declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule {
	public adminUsername;

	initializeApp(adminUsername) {
		this.adminUsername = adminUsername;
	}
}
