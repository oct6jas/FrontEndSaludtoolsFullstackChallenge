import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/Config';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient, private config : Config) { }

  getAllMedicineByFilter(patientId:string){

    let url:string = this.config.backendService + '/medicine/filter/rule';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{patientId:patientId}});
  }
}
