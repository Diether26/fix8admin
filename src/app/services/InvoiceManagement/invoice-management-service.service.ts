import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceManagementServiceService {

  constructor(
    private httpClient :HttpClient
  ) {}

  public getInvoice(){
    let api_url = `${environment.api_host}admin/invoice`;
    return this.httpClient.get(api_url);
  }

  public getInvoiceDetails(id:any){
    let api_url = `${environment.api_host}admin/invoice/invoice-details?id=${id}`;
    return this.httpClient.get(api_url);
  }

  public getInvoiceItem(id:any){
    let api_url = `${environment.api_host}admin/invoice/invoice-item?id=${id}`;
    return this.httpClient.get(api_url);
  }


  public getPayment(id:any){
    let api_url = `${environment.api_host}admin/invoice/payment?id=${id}`;
    return this.httpClient.get(api_url);
  }
}
