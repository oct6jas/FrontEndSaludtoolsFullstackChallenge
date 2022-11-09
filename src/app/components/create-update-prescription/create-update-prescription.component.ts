import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MedicineService } from 'src/app/services/medicine.service';
import { PrescriptionService } from 'src/app/services/prescription.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-create-update-prescription',
  templateUrl: './create-update-prescription.component.html',
  styleUrls: ['./create-update-prescription.component.css']
})
export class CreateUpdatePrescriptionComponent implements OnInit {

  @Input() title: string;
  @Input() patientId: string;

  CreateUpdatePrescriptionForm!: FormGroup;
  submitted = false;
  json: any;
  showClass: boolean = false;
  resp: any;

  constructor(public modal: NgbActiveModal, private modalService: NgbModal, private formBuilder: FormBuilder, private medicineService: MedicineService, private prescriptionService: PrescriptionService) { }

  ngOnInit(): void {
    this.CreateUpdatePrescriptionForm = this.formBuilder.group(
      {
        medicine: ["", Validators.required],
      },
    );

    this.medicineService.getAllPatientByFilter(this.patientId).subscribe(
      response => {
        this.resp = response;

        console.log(this.resp)
      },
      (error) => {
        const modalRef = this.modalService.open(MessageComponent);
        modalRef.componentInstance.title = "Error al encontrar los medicamentos";
        modalRef.componentInstance.message = error.error.menssage;
      }
    );
  }

  get form() {
    return this.CreateUpdatePrescriptionForm.controls;
  }

  onReset() {
    this.CreateUpdatePrescriptionForm.reset();
    this.showClass = false;
  }

  onSubmit() {

    if (this.CreateUpdatePrescriptionForm.invalid) {
      if (this.form.medicine.errors) {
        this.showClass = true;
      }
      return;
    }

    let medicine = this.resp.find(element => element.name === this.form.medicine.value);

    let prescription = {
      id: null,
      patientId: this.patientId,
      medicineId: medicine.id
    }

    if(prescription.id != null || prescription.id != undefined ){
      this.updatePrescription (prescription);
    } else {
      this.createPrescription(prescription);
    }
  }

  createPrescription(prescription){
    this.prescriptionService.createPrescription(prescription).subscribe(
      response => {
        this.modal.dismiss();
        const modalRef = this.modalService.open(MessageComponent);
        modalRef.componentInstance.title = "Prescripcion Creada";
        modalRef.componentInstance.message = "Prescripcion Creada con exito";
        modalRef.componentInstance.reload = true;
      },
      (error) => {
        const modalRef = this.modalService.open(MessageComponent);
        modalRef.componentInstance.title = "Error creando prescripcion";
        modalRef.componentInstance.message = error.error.menssage;
      }
    )
  }

  updatePrescription(prescription){}



}
