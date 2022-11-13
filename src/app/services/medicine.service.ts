import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) { }

  getAllMedicineByFilter(patientId:string){

    let url:string = environment.server + 'medicine/filter/rule';
                                                                                                                                                                           
    return this.http.get(url, {
   
      params:{patientId:patientId}});
  }
}
