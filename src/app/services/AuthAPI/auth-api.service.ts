import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public loginAccount(data: any) {
    let api_url = `${environment.api_host}common/auth`;
    return this.httpClient.post(api_url, data);
  }

  public createAccount(data: FormData) {
    let api_url = `${environment.api_host}admin/auth/register`;
    return this.httpClient.post(api_url, data);
  }

  public currentUserdata() {
    let api_url = `${environment.api_host}common/auth/me`;
    return this.httpClient.get(api_url);
  }

}
