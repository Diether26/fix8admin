import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { AccountService } from '../../../services/Account/account.service';
import { AuthAPIService } from '../../../services/AuthAPI/auth-api.service';
import { DataReloadService } from '../../../services/DataReload/data-reload.service';

const Swal = require('sweetalert2')

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit{
  _user_basic_info = {
    Firstname: "",
    Middlename: "",
    Lastname: ""
  }
  account_settings = {
    Firstname:"",
    Middlename:"",
    Lastname:"",
    Email:"",
    ContactNumber:"",
    Birthdate:"",
    Sex:"",
    Address:""
  } 
  firstnameIsNotValid = false;
  lastnameIsNotValid = false;
  middlenameIsNotValid = false;
  emailIsNotValid = false;
  contactNumberIsNotValid = false;
  sexIsNotValid = false;
  birthdateIsNotValid = false;
  addressIsNotValid = false;
  loading = false;
  dialog: any;

  constructor(
    private validatorService: ValidatorService,
    private accountService : AccountService,
    private authAPIService: AuthAPIService,
    private dataReload: DataReloadService
  ){}

  ngOnInit() {
    this.getCurrentUser();
  }

  //getdetails
  public getCurrentUser() {
    this.authAPIService.currentUserdata()
    .pipe(
      finalize(() => {
        //loading part
        this.loading = false;
      })
    ).subscribe((response:any) => {
      if(response.flag == true) {
        //success part
        this.loading = true;
        this.account_settings = response.userData;
        this._user_basic_info.Firstname = response.userData.Firstname;
        this._user_basic_info.Middlename = response.userData.Middlename;
        this._user_basic_info.Lastname = response.userData.Lastname;
        this.dataReload.basicUserInfo(this._user_basic_info);
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
  
  //#region Validations
  public firstnameOnChange(ev:any){
    if(!this.validatorService.isCharAndSpaceOnly(this.account_settings.Firstname)){
      this.firstnameIsNotValid = true;
    }else{
      this.firstnameIsNotValid = false;
    }
  }

  public lastnameOnChange(ev:any){
    if(!this.validatorService.isCharAndSpaceOnly(this.account_settings.Lastname)){
      this.lastnameIsNotValid = true;
    }else{
      this.lastnameIsNotValid = false;
    }
  }

  public emailOnChange(ev:any){
    if(!this.validatorService.isValidEmail(this.account_settings.Email)){
      this.emailIsNotValid = true;
    }else{
      this.emailIsNotValid = false;
    }
  }

  public contactNumberOnChange(ev:any) {
    if (!this.validatorService.isNumOnly(this.account_settings.ContactNumber)) {
      this.contactNumberIsNotValid = true;
    } else {
      this.contactNumberIsNotValid = false;
    }
  }

  //keypress.
  numberOnly(ev:any): boolean {
    const charCode = (ev.which) ? ev.which : ev.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  public bdateOnChange(ev:any) {
    if (this.validatorService.isValidDate(this.account_settings.Birthdate)) {
      this.birthdateIsNotValid = true;
    } else {
      this.birthdateIsNotValid = false;
    }
  }

  public sexOnChange(ev:any) {
    if (!this.validatorService.isCharOnly(this.account_settings.Sex)) {
      this.sexIsNotValid = true;
    } else {
      this.sexIsNotValid = false;
    }
  }

  public addressOnChange(ev:any) {
    if (!this.validatorService.isOnValidMaxLengthAddress(this.account_settings.Address)) {
      this.addressIsNotValid = true;
    } else {
      this.addressIsNotValid = false;
    }
  }
  //#endregion

  //#region Update Informations.
  public submitUpdateAdminAccount(ev:any){
    let flag = true;
    let message = [];

    if(!this.validatorService.isCharAndSpaceOnly(this.account_settings.Firstname)){
       this.firstnameIsNotValid = true;
       flag = false && flag;
       message.push("Firstname must contain letters and space only!");
    }else{
      this.firstnameIsNotValid = false;
      flag = true && flag; 
    }

    if(!this.validatorService.isCharAndSpaceOnly(this.account_settings.Lastname)){
      this.lastnameIsNotValid = true;
      flag = false && flag; 
      message.push("Lastname must contain letters and space only!");
    }else{
     this.lastnameIsNotValid = false;
     flag = true && flag; 
    }

    if (!this.validatorService.isValidEmail(this.account_settings.Email)) {
      this.emailIsNotValid = true;
      flag = false && flag; 
      message.push("Email must be valid.");
    } else {
      this.emailIsNotValid = false;
      flag = true && flag; 
    }

    if (!this.validatorService.isNumOnly(this.account_settings.ContactNumber)) {
      this.contactNumberIsNotValid = true;
      flag = false && flag; 
      message.push("Contact Number must contain numbers only!");
    } else {
      this.contactNumberIsNotValid = false;
      flag = true && flag; 
    }

    if (this.validatorService.isValidDate(this.account_settings.Birthdate)) {
      this.birthdateIsNotValid = true;
      message.push("Birthdate is invalid date.");
      flag = false && flag; 
    } else {
      this.birthdateIsNotValid = false;
      flag = true && flag; 
    }

    if (!this.validatorService.isCharOnly(this.account_settings.Sex)) {
      this.sexIsNotValid = true;
      message.push("Sex is required.");
      flag = false && flag; 
    } else {
      this.sexIsNotValid = false;
      flag = true && flag; 
    }

    if (!this.validatorService.isOnValidMaxLengthAddress(this.account_settings.Address)) {
      this.addressIsNotValid = true;
      message.push("Address Max length must be 500 characters only!");
      flag = false && flag; 
    } else {
      this.addressIsNotValid = false;
      flag = true && flag; 
    }

    if(flag){
        this.loading = true;
        this.accountService.updateAdminAccount(this.account_settings)
        .pipe(
          finalize(() =>{
            this.loading = false;
          })
        ).subscribe((response:any) =>{
            if(response.flag == true){
              Swal.fire({
                title: 'Success!',
                text: response.message,
                icon: 'success',
                confirmButtonText: 'Okay'
              })
              this.getCurrentUser();
            }else{
              let messageResponse = "";
              for(let i = 0; i < response.message.length; i++) {
                messageResponse += response.message[i]+"\n";
              }
              Swal.fire({
                title: 'Error!',
                text: messageResponse,
                icon: 'error',
                confirmButtonText: 'Okay'
              })
            }
        },
        (error:any) =>{
          Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Okay'
          })
          console.log(error)
        });
      }else{
        console.log(message);
      }
      return false;
    }

  //#endregion 
}
