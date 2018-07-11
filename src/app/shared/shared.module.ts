import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
	  SpinnerComponent,
	  HeaderComponent,
	  FooterComponent
  ],
  declarations: [SpinnerComponent, HeaderComponent, FooterComponent]
})
export class SharedModule { }
