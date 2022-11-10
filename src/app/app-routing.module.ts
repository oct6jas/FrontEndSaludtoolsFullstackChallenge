import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './pages/patients/patients.component';
import { PrescriptionComponent } from './pages/prescription/prescription.component';

const routes: Routes = [
  {path: '' , component: PatientsComponent},
  {path: 'prescription/:patientId' , component: PrescriptionComponent},
  {path: '**' , pathMatch:'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
