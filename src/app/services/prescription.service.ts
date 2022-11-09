import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  page: string = "0";

  constructor(private http: HttpClient) { }

  getAllPatientByFilter(patientId:string){

    let url:string = 'http://localhost:8080/prescription/filter/patient';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{page: this.page,  patientId:patientId}});
  }

  getValidatePrescriptionCreate(patientId:string){

    let url:string = 'http://localhost:8080/prescription/create/validate';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{page: this.page,  patientId:patientId}});
  }

  createPrescription(prescriptionDto: Object){

    let url:string = 'http://localhost:8080/prescription/create';
                                                                                                                                                                           
    return this.http.post(url, prescriptionDto);
  }
}
