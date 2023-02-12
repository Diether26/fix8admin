import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthJWTService } from './services/AuthJWT/auth-jwt.service';
import { AccountSettingsComponent } from './account/update/accountsettings/account-settings.component';
import { ChangepasswordComponent } from './account/update/changepassword/changepassword.component';
import { AuthAPIService } from './services/AuthAPI/auth-api.service';
import { finalize } from 'rxjs';
import { DataReloadService } from './services/DataReload/data-reload.service';
import { environment } from 'src/environments/environment';
import { ChangeavatarComponent } from './account/update/changeavatar/changeavatar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  isAuthenticated:boolean = false;
  opened = false;
  currentUser: any;
  avatar_url = environment.avatar_url;
  currentAvatar: any;
  constructor(
    private authJWTService: AuthJWTService,
    private router: Router,
    public dialog: MatDialog,
    private authAPIService: AuthAPIService,
    private dataReload: DataReloadService
  ) {
    this.dataReload.currentUser.subscribe( value => {
      this.currentUser = value;
    });
    this.dataReload.currentAvatar.subscribe( value => {
      this.currentAvatar = value;
    });
  }
  
  ngOnInit(): void { //so kani nga function matawag ni matik ig reload.
    this.isAuthenticated = this.authJWTService.isAuthenticated();
    this.redirectUser();
    this.getCurrentUser();
  }

  public getCurrentUser() {
    this.authAPIService.currentUserdata()
    .pipe(
      finalize(() => {
        //loading part
      })
    ).subscribe((response:any) => {
      if(response.flag == true) {
        //success part
        this.currentUser = response.userData;
        this.currentAvatar = `${this.avatar_url}${response.userData.Avatar}`;
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

  redirectUser(): void {
    console.log(window.location.href)
    if ((window.location.href).includes("login") || (window.location.href).includes("registration")) {
      if (this.authJWTService.getUsertype() !== "") {
        this.router.navigate([this.authJWTService.getUsertype()]);// para dle mo redirect if null, bacn mabuang mag cge ug reload, okay na  ahh mao ni ang mag pa reload?dle, after  login
      }
    }
  }

  openDialogAccSettings(): void {
    this.dialog.open(AccountSettingsComponent, {
      disableClose: true,
      width: '500px'
    });
    
  }
  openDialogChangePass(): void {
    this.dialog.open(ChangepasswordComponent, {
      disableClose: true,
      width: '400px'
    });
  }

  openDialogAvatar(): void {
    this.dialog.open(ChangeavatarComponent, {
      disableClose: true,
      width: '400px'
    });
  }
  
  logout() {
    localStorage.removeItem("token");
    window.location.replace("../login");
  }

}
