import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionMagementService {

  constructor(
    private httpClient :HttpClient
  ) {}

  public getSubscription(){
    let api_url = `${environment.api_host}admin/subscription`;
    return this.httpClient.get(api_url);
  }

  public getSubscriptionDetail(id:any){
    let api_url =`${environment.api_host}admin/subscription/payment-details?id=${id}`;
    return this.httpClient.get(api_url);
  }

  public approveSubcription(data:any){
    let api_url = `${environment.api_host}admin/subscription/approve`;
    return this.httpClient.post(api_url,data);
  }

  public rejectSubcription(data:any){
    let api_url = `${environment.api_host}admin/subscription/reject`;
    return this.httpClient.post(api_url,data);
  }

}
