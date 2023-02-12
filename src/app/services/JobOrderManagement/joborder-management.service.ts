import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JoborderManagementService {

  constructor(
    private httpClient :HttpClient
  ) {}

  public getJobOrders(){
    let api_url = `${environment.api_host}admin/joborder`;
    return this.httpClient.get(api_url);
  }

  
}
