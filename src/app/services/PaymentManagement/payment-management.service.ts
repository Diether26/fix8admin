import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentmanagementService {

  constructor(
    private httpClient :HttpClient
  ) { }

  
  public getPayment(){
    let api_url = `${environment.api_host}admin/payment`;
    return this.httpClient.get(api_url);
  }

  public getInvoiceDetails(id:any){
    let api_url = `${environment.api_host}admin/payment/invoice-details?id=${id}`;
    return this.httpClient.get(api_url);
  }

  public getInvoiceItem(id:any){
    let api_url = `${environment.api_host}admin/payment/invoice-item?id=${id}`;
    return this.httpClient.get(api_url);
  }
  
  public getSubscriptionDetail(id:any){
    let api_url = `${environment.api_host}admin/payment/subscription-detail?id=${id}`;
    return this.httpClient.get(api_url);
  }

  public getInvoiceReqDetail(id:any){
    let api_url = `${environment.api_host}admin/payment/invoice-request-detail?id=${id}`;
    return this.httpClient.get(api_url);
  }
}
