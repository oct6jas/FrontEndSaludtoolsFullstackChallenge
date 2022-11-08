import { Component, Input, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUpdatePatientComponent } from 'src/app/components/create-update-patient/create-update-patient.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patients: any;
  response: any;
  actualPage: number =1;
  disabledShowPrevious: boolean = true;
  disabledShowNext: boolean = true;
  totalPages: number;

  constructor(private patientsService: PatientsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.patientsService.getAllPatientByFilter('', '').subscribe(
      resp => {
         this.response = resp;
         this.patients = this.response.content;
         this.patientsService.page = (this.actualPage -1).toString();
          this.totalPages = this.response.totalPages
          this.showPrevious();
          this.showNext();
      }
    )
  }

  createPatient(title){
    const modalRef = this.modalService.open(CreateUpdatePatientComponent);
    modalRef.componentInstance.title = title;
  }

  prescriptionPatient(id:number){
    console.log("entro", id)
  }

  previous(){
    this.actualPage = this.actualPage -1;
    this.patientsService.page = (this.actualPage -1).toString();
    this.ngOnInit()
  }

  next(){
    this.actualPage = this.actualPage +1;
    this.patientsService.page = (this.actualPage -1).toString();
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
