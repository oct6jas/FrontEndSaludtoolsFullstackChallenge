import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) { }

  getAllPatientByFilter(patientId:string){

    let url:string = 'http://localhost:8080/medicine/filter/rule';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{patientId:patientId}});
  }
}
