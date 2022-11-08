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
      name: this.form.name.value,
      lastName: this.form.lastName.value,
      birthDay: this.form.birthDay.value,
      genderId: null,
    }


    if(this.form.gender.value === "Femenino"){
      patient.genderId = 1;
    } else  if(this.form.gender.value === "Masculino"){
      patient.genderId = 2;
    }

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

    this.submitted = true;
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
