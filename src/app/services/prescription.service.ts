import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/Config';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  page: string = "0";

  constructor(private http: HttpClient, private config : Config) { }

  getAllPresciptionByFilter(patientId:string){

    let url:string = this.config.backendService + '/prescription/filter/patient';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{page: this.page,  patientId:patientId}});
  }

  getValidatePrescriptionCreate(patientId:string){

    let url:string = this.config.backendService + '/prescription/create/validate';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{page: this.page,  patientId:patientId}});
  }

  getPrescriptionById(patientId:string, prescriptionId:string){

    let url:string = this.config.backendService + '/prescription/byid';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{patientId:patientId, prescriptionId:prescriptionId}});
  }

  createPrescription(prescriptionDto: Object){

    let url:string = this.config.backendService + '/prescription/create';
                                                                                                                                                                           
    return this.http.post(url, prescriptionDto);
  }

  updatePrescription(prescriptionDto: Object){

    let url:string = this.config.backendService + '/prescription/update';
                                                                                                                                                                           
    return this.http.put(url, prescriptionDto);
  }
}
