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
  @Input() prescriptionId:string;

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


    this.prescriptionService.getPrescriptionById(this.patientId, this.prescriptionId).subscribe(
      response => {
        this.resp = response;
        this.form.medicine.setValue(this.resp.medicineName);
      },
      (error) => {
        const modalRef = this.modalService.open(MessageComponent);
        modalRef.componentInstance.title = "Error en datos de la prescripcion";
        modalRef.componentInstance.message = error.error.menssage;
      }
    );
 

    this.medicineService.getAllMedicineByFilter(this.patientId).subscribe(
      response => {
        this.resp = response;
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
      id: this.prescriptionId,
      patientId: this.patientId,
      medicineId: medicine ? medicine.id : null
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

  updatePrescription(prescription){
    this.prescriptionService.updatePrescription(prescription).subscribe(
      response => {
        this.modal.dismiss();
        const modalRef = this.modalService.open(MessageComponent);
        modalRef.componentInstance.title = "Actualizacion de prescripción";
        modalRef.componentInstance.message = "Prescripción Actualizada con exito";
        modalRef.componentInstance.reload = true;
      },
      (error) => {
        const modalRef = this.modalService.open(MessageComponent);
        modalRef.componentInstance.title = "Error actualizando prescripcion";
        modalRef.componentInstance.message = error.error.menssage;
      }
    )
  }



}
