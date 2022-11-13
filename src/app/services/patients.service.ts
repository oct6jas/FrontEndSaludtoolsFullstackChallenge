import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  page: string = "0";

  constructor(private http: HttpClient) { }

  getAllPatientByFilter(textToSearch:string, genderId:string){

    let url:string = environment.server + 'patient/filter';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{page: this.page, size: 10, textToSearch: textToSearch, genderId:genderId}});
  }

  createPatient(patientDto: Object){

    let url:string = environment.server + 'patient/create';
                                                                                                                                                                           
    return this.http.post(url, patientDto);
  }

  updatePatient(patientDto: Object){

    let url:string = environment.server + 'patient/update';
                                                                                                                                                                           
    return this.http.put(url, patientDto);
  }

  getPatientById(patientId:string){

    let url:string = environment.server + 'patient/byid';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{patientId:patientId}});
  }
}
