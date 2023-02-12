import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AuthAPIService } from '../services/AuthAPI/auth-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  opened = false;
  constructor(
    private authAPIService: AuthAPIService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    this.authAPIService.currentUserdata()
    .pipe(
      finalize(() => {
        //loading part
      })
    ).subscribe((response:any) => {
      if(response.flag == true) {
        //success part
        console.log(response)       
      } else {
        console.log(response)
      }
    },
    (error:any) => {
      console.log(error.message)
      // if down ang api, or unauthorized ari na sya mugawas, sample
      //if error ari pagawsa
      console.log(error)
    });
  }
}
