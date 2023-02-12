import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataReloadService {
  public currentUser: BehaviorSubject<any> = new BehaviorSubject<any>({});
  public currentAvatar: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor() {
    this.currentAvatar.next("../../assets/images/default-profile.png");
   }
  
  public basicUserInfo(data:any) {
    this.currentUser.next(data);
  }

  public avatar(data:any) {
    this.currentAvatar.next(data);
  }
}
