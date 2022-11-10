import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/Config';

@Injectable({
  providedIn: 'root'
})
export class GeneralServicesService {

  constructor(private http: HttpClient, private config : Config) { }

  deletePatient(type, entity){

    let url:string = this.config.backendService + '/' + type + '/delete';
                                                                                                                                                                           
    return this.http.put(url, entity);
  }
}
