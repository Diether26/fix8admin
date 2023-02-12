import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractManagementService {

  constructor(
   private httpClient : HttpClient
  ) { }
  
  public getContractList(){
    let api_url = `${environment.api_host}admin/contract`;
    return this.httpClient.get(api_url);
  }

  public updateContractFile(data:FormData){
    let api_url = `${environment.api_host}admin/contract/upload`;
    return this.httpClient.post(api_url,data);
  }
}

