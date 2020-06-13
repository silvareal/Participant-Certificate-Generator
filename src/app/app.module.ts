import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenerateCertificateComponent } from './generate-certificate/generate-certificate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingXModule } from 'ngx-loading-x';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    GenerateCertificateComponent
  ],
  imports: [                                                                                                                                                                                                                                                                 
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 300000,
      preventDuplicates: true,
    }),
    NgxLoadingXModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
