import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpClient : HttpClient
  ) { }
  
  public getJobOrderStatuses(){
    let api_url = `${environment.api_host}admin/dashboard/job-order-statuses?from_date=01-01-1971&to_date=01-10-2025`;
    return this.httpClient.get(api_url);
  }
  
  public getUserCount(){
    let api_url = `${environment.api_host}admin/dashboard/all-users-count`;
    return this.httpClient.get(api_url);
  }
  
  public getPremiumUserCount(){
    let api_url = `${environment.api_host}admin/dashboard/premium-users-count`;
    return this.httpClient.get(api_url);
  }
  
  public getRequestContractCount(){
    let api_url = `${environment.api_host}admin/dashboard/request-contract-count`;
    return this.httpClient.get(api_url);
  }

}
