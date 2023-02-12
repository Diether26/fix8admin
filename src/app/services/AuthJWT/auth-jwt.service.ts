import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthJWTService {

  constructor(
    private jwtHelper: JwtHelperService
  ) { }

  public getToken(): any {
    return localStorage.getItem("token");
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    if (token !== null) {
      if (!this.jwtHelper.isTokenExpired(token)){
        return true;
      } else {
        localStorage.removeItem("token");
        return false;
      }
    } else {
      return false;
    }
  }

  public getUsertype(): string {
    const token = localStorage.getItem("token");
    const tokenPayload:any = token? decode(token) : null;
    if (tokenPayload !== null) {
      return tokenPayload.Usertype;
    } else {
      return "";
    }
  }
}
