import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateUpdatePatientComponent } from './components/create-update-patient/create-update-patient.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './components/message/message.component';
import { DeleteEntityComponent } from './components/delete-entity/delete-entity.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PatientsComponent,
    CreateUpdatePatientComponent,
    MessageComponent,
    DeleteEntityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
