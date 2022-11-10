import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientsService } from 'src/app/services/patients.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-create-update-patient',
  templateUrl: './create-update-patient.component.html',
  styleUrls: ['./create-update-patient.component.css']
})
export class CreateUpdatePatientComponent implements OnInit {

  @Input() title: string;
  @Input() patientId: string;
  resp: any;



  CreateUpdatePatientForm!: FormGroup;
  submitted = false;
  json: any;
  showClass: boolean = false;
  showClass2: boolean = false;
  showClass3: boolean = false;
  showClass4: boolean = false;

  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private formBuilder: FormBuilder, private patientsService: PatientsService) { }

  ngOnInit() {
    this.CreateUpdatePatientForm = this.formBuilder.group(
      {
        name: ["", Validators.required],
        lastName: ["", Validators.required],
        birthDay:["", Validators.required],
        gender:["", Validators.required]
      },
    );

    if(this.patientId != null){
      this.patientsService.getPatientById(this.patientId).subscribe(
        response => {
          this.resp = response;
          this.form.name.setValue(this.resp.name);
          this.form.lastName.setValue(this.resp.lastName);
          this.form.birthDay.setValue(this.resp.birthDay);
          this.form.gender.setValue(this.resp.genderId);
        },
        (error) => {
          const modalRef = this.modalService.open(MessageComponent);
          modalRef.componentInstance.title = "Error en datos del paciente";
          modalRef.componentInstance.message = error.error.menssage;
        }
      );
    }
  }


  get form() {
    return this.CreateUpdatePatientForm.controls;
  }

  onSubmit() {

    if (this.CreateUpdatePatientForm.invalid) {
      if (this.form.name.errors) {
        this.showClass = true;
      }
      if (this.form.lastName.errors) {
        this.showClass2 = true;
      }
      if (this.form.birthDay.errors) {
        this.showClass3 = true;
      }
      if (this.form.gender.errors) {
        this.showClass4 = true;
      }
      
      return;
    }

    let patient = {
      id: this.patientId || null,
      name: this.form.name.value,
      lastName: this.form.lastName.value,
      birthDay: this.form.birthDay.value,
      genderId: this.form.gender.value,
    }

    if(this.patientId != null || this.patientId != undefined ){
      this.updatePatient (patient);
    } else {
      this.createPatient(patient);
    }

    this.submitted = true;
  }

  createPatient(patient){
    this.patientsService.createPatient(patient).subscribe(
      response => {
        this.modal.dismiss();
        const modalRef = this.modalService.open(MessageComponent);
        modalRef.componentInstance.title = "Paciente Creado";
        modalRef.componentInstance.message = "Paciente Creado con exito";
        modalRef.componentInstance.reload = true;
      },
      (error) => {
        const modalRef = this.modalService.open(MessageComponent);
        modalRef.componentInstance.title = "Error creando paciente";
        modalRef.componentInstance.message = error.error.menssage;
      }

    )
  }

  updatePatient(patient){
    this.patientsService.updatePatient(patient).subscribe(
      response => {
        this.modal.dismiss();
        const modalRef = this.modalService.open(MessageComponent);
        modalRef.componentInstance.title = "Paciente Actualizado";
        modalRef.componentInstance.message = "Paciente Actualizado con exito";
        modalRef.componentInstance.reload = true;
      },
      (error) => {
        const modalRef = this.modalService.open(MessageComponent);
        modalRef.componentInstance.title = "Error Actualizando paciente";
        modalRef.componentInstance.message = error.error.menssage;
      }

    )
  }

  onReset() {
    this.submitted = false;
    this.CreateUpdatePatientForm.reset();
    this.showClass = false;
    this.showClass2 = false;
    this.showClass3 = false;
    this.showClass4 = false;
  }

}
