import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  
  constructor(
    private httpClient : HttpClient
  ) { }
  
  public getReportedUsers(){
    let api_url = `${environment.api_host}admin/report/reported-users`;
    return this.httpClient.get(api_url);
  }

  public getUserLogs(){
    let api_url = `${environment.api_host}admin/report/user-logs`;
    return this.httpClient.get(api_url);
  }
}
