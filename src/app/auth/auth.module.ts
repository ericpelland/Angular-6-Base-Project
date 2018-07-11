import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
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

	initializeApp(adminUsername){
		this.adminUsername = adminUsername;
	}
}
