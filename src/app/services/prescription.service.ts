import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  page: string = "0";

  constructor(private http: HttpClient) { }

  getAllPresciptionByFilter(patientId:string){

    let url:string = 'http://54.81.151.7:8080/prescription/filter/patient';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{page: this.page,  patientId:patientId}});
  }

  getValidatePrescriptionCreate(patientId:string){

    let url:string = 'http://54.81.151.7:8080/prescription/create/validate';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{page: this.page,  patientId:patientId}});
  }

  getPrescriptionById(patientId:string, prescriptionId:string){

    let url:string = 'http://54.81.151.7:8080/prescription/byid';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{patientId:patientId, prescriptionId:prescriptionId}});
  }

  createPrescription(prescriptionDto: Object){

    let url:string = 'http://54.81.151.7:8080/prescription/create';
                                                                                                                                                                           
    return this.http.post(url, prescriptionDto);
  }

  updatePrescription(prescriptionDto: Object){

    let url:string = 'http://54.81.151.7:8080/prescription/update';
                                                                                                                                                                           
    return this.http.put(url, prescriptionDto);
  }
}
