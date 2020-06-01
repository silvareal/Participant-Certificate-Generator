import { GenerateCertificateComponent } from './generate-certificate/generate-certificate.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: 'generate-certificate', component: GenerateCertificateComponent },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
