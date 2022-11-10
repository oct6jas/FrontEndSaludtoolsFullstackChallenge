import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  page: string = "0";

  constructor(private http: HttpClient) { }

  getAllPatientByFilter(textToSearch:string, genderId:string){

    let url:string = 'http://54.81.151.7:8080/patient/filter';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{page: this.page, size: 10, textToSearch: textToSearch, genderId:genderId}});
  }

  createPatient(patientDto: Object){

    let url:string = 'http://54.81.151.7:8080/patient/create';
                                                                                                                                                                           
    return this.http.post(url, patientDto);
  }

  updatePatient(patientDto: Object){

    let url:string = 'http://54.81.151.7:8080/patient/update';
                                                                                                                                                                           
    return this.http.put(url, patientDto);
  }

  getPatientById(patientId:string){

    let url:string = 'http://54.81.151.7:8080/patient/byid';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{patientId:patientId}});
  }
}
