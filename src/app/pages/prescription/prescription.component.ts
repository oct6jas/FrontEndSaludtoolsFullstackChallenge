import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUpdatePrescriptionComponent } from 'src/app/components/create-update-prescription/create-update-prescription.component';
import { DeleteEntityComponent } from 'src/app/components/delete-entity/delete-entity.component';
import { PrescriptionService } from 'src/app/services/prescription.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  patientId: string = this.route.snapshot.paramMap.get('patientId');
  prescription: any;
  response: any;
  actualPage: number =1;
  disabledShowPrevious: boolean = true;
  disabledShowNext: boolean = true;
  totalPages: number;
  validateCreate: boolean;

  constructor(private modalService: NgbModal, private route: ActivatedRoute, private prescriptionService: PrescriptionService) { }

  ngOnInit(): void {

    this.prescriptionService.getValidatePrescriptionCreate(this.patientId).subscribe(
      resp => {
         this.response = resp;
         this.validateCreate = this.response
      }
    );

    this.prescriptionService.getAllPresciptionByFilter(this.patientId).subscribe(
      resp => {
         this.response = resp;
         this.prescription = this.response.content;
         this.prescriptionService.page = (this.actualPage -1).toString();
          this.totalPages = this.response.totalPages
          this.showPrevious();
          this.showNext();
      }
    );
  }

  createPrescription(title){
    const modalRef = this.modalService.open(CreateUpdatePrescriptionComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.patientId = this.patientId;

  }

  updatePrescription(title, id){
    const modalRef = this.modalService.open(CreateUpdatePrescriptionComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.patientId = this.patientId;
    modalRef.componentInstance.prescriptionId = id;
  }

  deletePrescription(id){
    const modalRef = this.modalService.open(DeleteEntityComponent);
    modalRef.componentInstance.title = "Borrar Prescripcion";
    modalRef.componentInstance.message = "Desea borrar la prescripcion con id: " + id;
    modalRef.componentInstance.type = "prescription";
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.patientId = this.patientId;

  }

  previous(){
    this.actualPage = this.actualPage -1;
    this.prescriptionService.page = (this.actualPage -1).toString();
    this.ngOnInit()
  }

  next(){
    this.actualPage = this.actualPage +1;
    this.prescriptionService.page = (this.actualPage -1).toString();
    this.ngOnInit()
  }

  showPrevious(){
    if (this.actualPage == 1){
      this.disabledShowPrevious = false;
    } else {
      this.disabledShowPrevious = true;
    }
  }

  showNext(){
    if (this.actualPage == this.totalPages || this.actualPage > this.totalPages ){
      this.disabledShowNext = false;
    } else {
      this.disabledShowNext = true;
    }
  }

 

}
