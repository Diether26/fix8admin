import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getUsers() {
    let api_url = `${environment.api_host}admin/user`;
    return this.httpClient.get(api_url);
  }

  public getUserById(id:any){
    let api_url = `${environment.api_host}admin/user/details?id=${id}`;
    return this.httpClient.get(api_url);
  }

  public updateUser(data:any){
    let api_url = `${environment.api_host}admin/user/update`;
    return this.httpClient.post(api_url,data);
  }

  public updateStatus(data:any){
    let api_url = `${environment.api_host}admin/user/update-status`;
    return this.httpClient.post(api_url,data);
  }

  public activateUser(data:any){
    let api_url = `${environment.api_host}admin/user/activate`;
    return this.httpClient.post(api_url,data);
  }

  public deactivateUser(data:any){
    let api_url = `${environment.api_host}admin/user/deactivate`;
    return this.httpClient.post(api_url,data);
  }

  public banUser(data:any){
    let api_url = `${environment.api_host}admin/user/ban`;
    return this.httpClient.post(api_url,data);
  }

  public deleteUser(data:any){
    let api_url = `${environment.api_host}admin/user/delete`;
    return this.httpClient.post(api_url,data);
  }
}
