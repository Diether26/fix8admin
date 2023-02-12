import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public changePassword(data:any){
    let api_url = `${environment.api_host}admin/account/change-password`;
    return this.httpClient.post(api_url,data);
  }
  
  public updateAdminAccount(data:any){
    let api_url = `${environment.api_host}admin/account/update-account`;
    return this.httpClient.post(api_url,data);
  }

  public updateAvatar(data:FormData){
    let api_url = `${environment.api_host}admin/account/update-avatar`;
    return this.httpClient.post(api_url,data);
  }
}
