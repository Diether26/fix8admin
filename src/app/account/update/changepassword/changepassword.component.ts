import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ValidatorService } from 'src/app/services/validator/validator.service';
import { AccountService } from '../../../services/Account/account.service';
import { AuthAPIService } from '../../../services/AuthAPI/auth-api.service';

const Swal = require('sweetalert2')

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})

export class ChangepasswordComponent implements OnInit{
  loading = false;
  
  @Input() passwords: any = {
    oldpassword: "",
    newpassword: "",
    confirmpassword: ""
  };

    hideold = true;
    hidenew = true;
    hideconfirm = true;

    oldisSpecialvalid = false;
    newisSpecialvalid = false;
    confirmisSpecialvalid = false;

    oldpassminimumIsValid = false;
    newpassminimumIsValid = false;
    confirmpassminimumIsValid = false;

    newPasswordMatchIsValid = false;
    confirmPasswordMatchIsValid = false;
    dialog: any;
    constructor(
      // private location: Location, 
      private validatorService: ValidatorService,
      private authAPIService: AuthAPIService,
      private accountService : AccountService
    ) {}
    
    ngOnInit(){}
  //#region field validations
   
    //old password on change..
    public oldpasswordChange(ev:any){
        if (!this.validatorService.isOnValidMinLength(this.passwords.oldpassword)){
          this.oldpassminimumIsValid  = true;
        }
        else if(!this.validatorService.isOnValidMaxLength(this.passwords.oldpassword)){
          this.oldpassminimumIsValid = true;
        } 
        else if(this.validatorService.isCharNumOnly(this.passwords.oldpassword)){
            this.oldisSpecialvalid= true;
          }
        else{
          this.oldpassminimumIsValid = false;
          this.oldisSpecialvalid= false;
        }
     }

    //new password on change..
    public newpasswordChange(ev:any){
      if (!this.validatorService.isOnValidMinLength(this.passwords.newpassword)){
        this.newpassminimumIsValid  = true;
      }else{
        this.newpassminimumIsValid  = false;
      }

      if(!this.validatorService.isOnValidMaxLength(this.passwords.newpassword)){
        this.newpassminimumIsValid = true;
      } else{
        this.newpassminimumIsValid = false;
      }

      if(this.validatorService.isCharNumOnly(this.passwords.newpassword)){
        this.newisSpecialvalid= true;
      } else{
        this.newisSpecialvalid= false;
      }
    }

    //confirm password on change..
    public confirmpasswordChange(ev:any){
      console.log(this.passwords)
      if (!this.validatorService.isOnValidMinLength(this.passwords.confirmpassword)){
        this.confirmpassminimumIsValid  = true;
      } else {
        this.confirmpassminimumIsValid = false;
      }

      if(!this.validatorService.isOnValidMaxLength(this.passwords.confirmpassword)){
        this.confirmpassminimumIsValid = true;
      } else {
        this.confirmpassminimumIsValid = false;
      }
      
      if(this.validatorService.isCharNumOnly(this.passwords.confirmpassword)){ // kaning mga ev.target.value pwede raasad na nimo alisdan gamit aning naka object nga passwords / ngmodel
        this.confirmisSpecialvalid= true;
      } else {
        this.confirmisSpecialvalid= false;
      }

      if(!this.validatorService.isPasswordMatch(this.passwords.newpassword,this.passwords.confirmpassword)){
        this.confirmPasswordMatchIsValid = true;
      }
      else {
        this.confirmPasswordMatchIsValid = false;
      }
    }
    //#region submit changes in password 
    public submitChangePassword(ev:any){
      let flag = true;
      let message = [];

      //Old password validations
      if (!this.validatorService.isOnValidMinLength(this.passwords.oldpassword)){
        this.oldpassminimumIsValid  = true;
        flag = false && flag;
        message.push("Old Password must have minimum of 6 Characters.");
      }else{
        this.oldpassminimumIsValid = false;
        flag = true && flag;
      }
      
      if(!this.validatorService.isOnValidMaxLength(this.passwords.oldpassword)){
        this.oldpassminimumIsValid = true;
        message.push("Old Password must have maximum of 12 Characters.");
        flag = false && flag;
      }else{
        this.oldpassminimumIsValid = false;
        flag = true && flag;
      }
      
      if(this.validatorService.isCharNumOnly(this.passwords.oldpassword)){
        this.oldisSpecialvalid= true;
        message.push("Old Password must contain at least 1 special characters.");
        flag = false && flag;
      }
      else{
        this.oldisSpecialvalid= false;
        flag = true && flag;
      }

      //New Password Validations.
      if (!this.validatorService.isOnValidMinLength(this.passwords.newpassword)){
        this.newpassminimumIsValid  = true;
        message.push("New Password must have minimum of 6 characters only.");
        flag = false && flag;
      }else{
        this.newpassminimumIsValid  = false;
        flag = true && flag;
      }

      if(!this.validatorService.isOnValidMaxLength(this.passwords.newpassword)){
        this.newpassminimumIsValid = true;
        message.push("New Password must have maximum of 12 characters only.");
        flag = false && flag;
      } else{
        this.newpassminimumIsValid = false;
        flag = true && flag;
      }

      if(this.validatorService.isCharNumOnly(this.passwords.newpassword)){
        this.newisSpecialvalid= true;
        message.push("New Password must contain at least 1 special characters.");
        flag = false && flag;
      } else{
        this.newisSpecialvalid= false;
        flag = true && flag;
      }

      if(!this.validatorService.isPasswordMatch(this.passwords.newpassword,this.passwords.confirmpassword)){
        this.newPasswordMatchIsValid = true;
        message.push("New Password is not match.");
        flag = false && flag;
      }
      else {
        this.newPasswordMatchIsValid = false;
        flag = true && flag;
      }

      //Confirm Password Validations.
      if (!this.validatorService.isOnValidMinLength(this.passwords.confirmpassword)){
        this.confirmpassminimumIsValid  = true;
        message.push("New Password must have minimum of 6 characters only.");
        flag = false && flag;
      }else{
        this.confirmpassminimumIsValid  = false;
        flag = true && flag;
      }

      if(!this.validatorService.isOnValidMaxLength(this.passwords.confirmpassword)){
        this.confirmpassminimumIsValid = true;
        message.push("New Password must have maximum of 12 characters only.");
        flag = false && flag;
      } else{
        this.confirmpassminimumIsValid = false;
        flag = true && flag;
      }

      if(this.validatorService.isCharNumOnly(this.passwords.confirmpassword)){
        this.confirmisSpecialvalid= true;
        message.push("New Password must contain at least 1 special characters.");
        flag = false && flag;
      } else{
        this.confirmisSpecialvalid= false;
        flag = true && flag;
      }

      if(!this.validatorService.isPasswordMatch(this.passwords.newpassword,this.passwords.confirmpassword)){
        this.confirmPasswordMatchIsValid = true;
        message.push("New Password is not match.");
        flag = false && flag;
      }
      else {
        this.confirmPasswordMatchIsValid = false;
        flag = true && flag;
      }

      if(flag){
          this.loading = true;
          this.accountService.changePassword(this.passwords)
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
          (error:any) => { 
            Swal.fire({
              title: 'Error!',
              text: error.message,
              icon: 'error',
              confirmButtonText: 'Okay'
            })
            console.log(error)
          });
      } else {
        console.log(message);
      }  
      return false;
    }
    //#endregion
}
