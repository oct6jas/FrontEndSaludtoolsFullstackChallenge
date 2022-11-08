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

  @Input() patients: any;

  constructor(private patientsService: PatientsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.patientsService.getAllPatientByFilter('', '').subscribe(
      resp => {
         this.patients = resp;
         this.patients = this.patients.content;
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
}
