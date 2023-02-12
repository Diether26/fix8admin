
import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  // public registerAdmin(data: FormData) {
  //   let api_endpoint = `${environment.api}homeowner/auth/register`;
  //   return this.httpClient.post(api_endpoint, data);
  // }

  public isEmpty(value: any){
    if (value && value.length > 0) {
      if (value) {
          return true;
      } else {
          return false;
      }
    } else {
        return false;
    }
  }
  public isCharAndSpaceOnly(value: any) {
    if (value && value.length > 0) {
      if (/^[a-zA-Z\s]*$/.test(value)) {
          return true;
      } else {
          return false;
      }
    } else {
        return false;
    }
  }

  public isCharOnly(value:any) {
    if (value && value.length > 0) {
      if (/^[a-zA-Z]+$/.test(value)) {
          return true;
      } else {
          return false;
      }
    } else {
        return false;
    }
  }

  public isValidEmail(value: any) {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value && value.length > 0) {
        if (emailPattern.test(value)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
  }

  public isNumOnly (value: any) {
    if (value && value.length > 0) {
      if (/^\d+$/.test(value)) {
          return true;
      } else {
          return false;
      }
    } else {
        return false;
    }
  }

  public isOnValidMaxLength(value: any) {
    if (value && value.length <= 12) {
      return true;
    } else {
        return false;
    }
  }

  public isOnValidMinLength(value: any) {
    if (value && value.length >= 6) {
      return true;
    } else {
        return false;
    }
  }

  public isOnValidMaxLengthAddress(value: any) {
    if (value && value.length <= 500) {
      return true;
    } else {
        return false;
    }
  }
  
  public isCharNumOnly(value: any) {
    if (value && value.length > 0) {
      if (/^[a-zA-Z0-9]+$/.test(value)) {
          return true;
      } else {
          return false;
      }
    } else {
      return false;
    }
  }

  public isValidDate(value: any) {
    if (value && value.length > 0) {
      if (/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(value)) {
          return true;
      } else {
          return false;
      }
    } else {
      return false;
    }
  }

  public isPasswordMatch(value1:any,value2:any){
    if(value1 == value2){
        return true;
    }else{
      return false;
    }
  }
}
