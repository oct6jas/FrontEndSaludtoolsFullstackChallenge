import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  page: string = "0";

  constructor(private http: HttpClient) { }

  getAllPresciptionByFilter(patientId:string){

    let url:string = environment.server + 'prescription/filter/patient';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{page: this.page,  patientId:patientId}});
  }

  getValidatePrescriptionCreate(patientId:string){

    let url:string = environment.server + 'prescription/create/validate';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{page: this.page,  patientId:patientId}});
  }

  getPrescriptionById(patientId:string, prescriptionId:string){

    let url:string = environment.server + 'prescription/byid';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{patientId:patientId, prescriptionId:prescriptionId}});
  }

  createPrescription(prescriptionDto: Object){

    let url:string = environment.server + 'prescription/create';
                                                                                                                                                                           
    return this.http.post(url, prescriptionDto);
  }

  updatePrescription(prescriptionDto: Object){

    let url:string = environment.server + 'prescription/update';
                                                                                                                                                                           
    return this.http.put(url, prescriptionDto);
  }
}
