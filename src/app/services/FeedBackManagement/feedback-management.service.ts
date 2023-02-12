import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackManagementService {

  constructor(
    private httpClient : HttpClient
  ) { }

  public getFeedbackList(){
    let api_url = `${environment.api_host}admin/feedback`;
    return this.httpClient.get(api_url);
  }

  public deleteFeedback(data:any){
    let api_url = `${environment.api_host}admin/feedback/delete`;
    return this.httpClient.post(api_url,data);
  }

}
