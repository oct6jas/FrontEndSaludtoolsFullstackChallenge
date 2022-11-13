import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralServicesService {

  constructor(private http: HttpClient) { }

  deletePatient(type, entity){

    let url:string = environment.server + type + '/delete';
                                                                                                                                                                           
    return this.http.put(url, entity);
  }
}
