import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateUpdatePatientComponent } from './components/create-update-patient/create-update-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './components/message/message.component';
import { DeleteEntityComponent } from './components/delete-entity/delete-entity.component';
import { PrescriptionComponent } from './pages/prescription/prescription.component';
import { CreateUpdatePrescriptionComponent } from './components/create-update-prescription/create-update-prescription.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PatientsComponent,
    CreateUpdatePatientComponent,
    MessageComponent,
    DeleteEntityComponent,
    PrescriptionComponent,
    CreateUpdatePrescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
