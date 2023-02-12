import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { UserManagementService } from '../../../services/UserManagement/user-management.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ValidatorService } from 'src/app/services/validator/validator.service';

const Swal = require('sweetalert2')
@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.scss']
})
export class UsersettingsComponent implements OnInit{
  _user_basic_info = {
    Firstname: ""
  }

  user_settings = {
    Id:"",
    Firstname:"",
    Middlename:"",
    Lastname:"",
    Email:"",
    Contactnumber:"",
    Birthdate:"",
    Sex:"",
    Address:"",
    Username:"",
    Password:""
  } 

  firstnameIsNotValid = false;
  lastnameIsNotValid = false;
  middlenameIsNotValid = false;
  emailIsNotValid = false;
  contactNumberIsNotValid = false;
  sexIsNotValid = false;
  birthdateIsNotValid = false;
  addressIsNotValid = false;
  usernameIsNotValid = false;
  passwordIsNotValid = false;
  loading = false;
  hide = true;

  constructor(
    private validatorService: ValidatorService,
    private userMngtService: UserManagementService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ){}

  ngOnInit() {
    this.getUserDetail();
    console.log(this.data)
  }

  public getUserDetail() {
    this.userMngtService.getUserById(this.data.id)
    .pipe(
      finalize(() => {
        //loading part
        this.loading = false;
      })
    ).subscribe((response:any) => {
      if(response.flag == true) {
        this.loading = true;
        //success part
        this.user_settings = response.userDetail;
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
    if(!this.validatorService.isCharAndSpaceOnly(this.user_settings.Firstname)){
      this.firstnameIsNotValid = true;
    }else{
      this.firstnameIsNotValid = false;
    }
  }

  public lastnameOnChange(ev:any){
    if(!this.validatorService.isCharAndSpaceOnly(this.user_settings.Lastname)){
      this.lastnameIsNotValid = true;
    }else{
      this.lastnameIsNotValid = false;
    }
  }

  public middlenameOnChange(ev:any){
    if(!this.validatorService.isCharAndSpaceOnly(this.user_settings.Middlename)){
      this.middlenameIsNotValid = true;
    }else{
      this.middlenameIsNotValid = false;
    }
  }

  public emailOnChange(ev:any){
    if(!this.validatorService.isValidEmail(this.user_settings.Email)){
      this.emailIsNotValid = true;
    }else{
      this.emailIsNotValid = false;
    }
  }

  public contactNumberOnChange(ev:any) {
    if (!this.validatorService.isNumOnly(this.user_settings.Contactnumber)) {
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
    if (!this.validatorService.isValidDate(this.user_settings.Birthdate)) {
      // this.birthdateIsNotValid = true;
    } else {
      // this.birthdateIsNotValid = false;
    }
  }

  public sexOnChange(ev:any) {
    if (!this.validatorService.isCharOnly(this.user_settings.Sex)) {
      this.sexIsNotValid = true;
    } else {
      this.sexIsNotValid = false;
    }
  }

  public addressOnChange(ev:any) {
    if (!this.validatorService.isOnValidMaxLengthAddress(this.user_settings.Address)) {
      this.addressIsNotValid = true;
    } else {
      this.addressIsNotValid = false;
    }
  }

  //username validataion
  public usernameOnChange(ev:any) {
    if (!this.validatorService.isEmpty(this.user_settings.Username)) {
      this.usernameIsNotValid = true;
    } else {
      this.usernameIsNotValid = false;
    }
  }

  //password validataion
  public passwordOnChange(ev:any) {
    if (!this.validatorService.isEmpty(this.user_settings.Password)) {
      this.passwordIsNotValid = true;
    } else {
      this.passwordIsNotValid = false;
    }
  }
  //#endregion validation

  //#region Update Informations.
   public submitUpdateUser(ev:any){
    let flag = true;
    let message = [];

  //#region for submit validations
    if(!this.validatorService.isCharAndSpaceOnly(this.user_settings.Firstname)){
       this.firstnameIsNotValid = true;
       flag = false && flag;
       message.push("Firstname must contain letters and space only!");
    }else{
      this.firstnameIsNotValid = false;
      flag = true && flag; 
    }

    if(!this.validatorService.isCharAndSpaceOnly(this.user_settings.Lastname)){
      this.lastnameIsNotValid = true;
      flag = false && flag; 
      message.push("Lastname must contain letters and space only!");
    }else{
     this.lastnameIsNotValid = false;
     flag = true && flag; 
    }

    if(!this.validatorService.isCharAndSpaceOnly(this.user_settings.Middlename)){
      this.middlenameIsNotValid = true;
      flag = false && flag; 
      message.push("Middlename must contain letters and space only!");
    }else{
      this.middlenameIsNotValid = false;
      flag = true && flag; 
    }

    if (!this.validatorService.isValidEmail(this.user_settings.Email)) {
      this.emailIsNotValid = true;
      flag = false && flag; 
      message.push("Email must be valid.");
    } else {
      this.emailIsNotValid = false;
      flag = true && flag; 
    }

    if (!this.validatorService.isNumOnly(this.user_settings.Contactnumber)) {
      this.contactNumberIsNotValid = true;
      flag = false && flag; 
      message.push("Contact Number must contain numbers only!");
    } else {
      this.contactNumberIsNotValid = false;
      flag = true && flag; 
    }

    if (!this.validatorService.isValidDate(this.user_settings.Birthdate)) {
      // this.birthdateIsNotValid = true;
      message.push("Birthdate is invalid date.");
      //flag = false && flag; 
    } else {
      // this.birthdateIsNotValid = false;
      //flag = true && flag; 
    }

    if (!this.validatorService.isCharOnly(this.user_settings.Sex)) {
      this.sexIsNotValid = true;
      message.push("Sex is required.");
      flag = false && flag; 
    } else {
      this.sexIsNotValid = false;
      flag = true && flag; 
    }

    if (!this.validatorService.isOnValidMaxLengthAddress(this.user_settings.Address)) {
      this.addressIsNotValid = true;
      message.push("Address Max length must be 500 characters only!");
      flag = false && flag; 
    } else {
      this.addressIsNotValid = false;
      flag = true && flag; 
    }
    //#endregion for submit validations

    if(flag){
        this.loading = true;
        this.userMngtService.updateUser(this.user_settings)
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
