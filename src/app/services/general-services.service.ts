import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralServicesService {

  constructor(private http: HttpClient) { }

  deletePatient(type, entity){

    let url:string = 'http://localhost:8080/' + type + '/delete';
                                                                                                                                                                           
    return this.http.put(url, entity);
  }
}
