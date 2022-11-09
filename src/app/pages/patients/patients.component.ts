import { Component, Input, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUpdatePatientComponent } from 'src/app/components/create-update-patient/create-update-patient.component';
import { MessageComponent } from 'src/app/components/message/message.component';
import { DeleteEntityComponent } from 'src/app/components/delete-entity/delete-entity.component';

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
  @Input() searchTex:string = "";

  constructor(private patientsService: PatientsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.patientsService.getAllPatientByFilter(this.searchTex, '').subscribe(
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

  updatePatient(title, id){
    const modalRef = this.modalService.open(CreateUpdatePatientComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.patientId = id;
  }

  deletePatient(id){
    const modalRef = this.modalService.open(DeleteEntityComponent);
    modalRef.componentInstance.title = "Borrar Paciente";
    modalRef.componentInstance.message = "Desea borrar el paciente con id: " + id;
    modalRef.componentInstance.type = "patient";
    modalRef.componentInstance.id = id;
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

  search(){
    console.log(this.searchTex)
    this.ngOnInit()

  }
}
