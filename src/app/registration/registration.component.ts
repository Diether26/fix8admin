import { Component,OnInit } from '@angular/core';
import { AuthAPIService } from '../services/AuthAPI/auth-api.service';
import { finalize } from 'rxjs';
import { ValidatorService } from '../services/validator/validator.service';

const Swal = require('sweetalert2')

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit{
  file: any = [];
  firstNameisnotValid = false;
  middleNameisnotValid = false;
  lastNameisnotValid = false;
  emailisnotValid = false;
  addressisnotValid = false;
  contactisnotValid = false;
  sexisnotValid = false;
  bdateisnotValid = false;
  usernameisnotValid = false;
  passwordisnotValid = false;
  isSpecialvalid = false;
  loading = false;
  constructor(
    // private location: Location, 
    private validatorService: ValidatorService,
    private authAPIService: AuthAPIService
  ) {}

  ngOnInit() { }

  //#region validation 
  public fnChange(ev:any) {
    if (!this.validatorService.isCharOnly(ev.target.value)) {
      this.firstNameisnotValid = true;
    } else {
      this.firstNameisnotValid = false;
    }
  }
  
  public mnChange(ev:any) {
    if (!this.validatorService.isCharOnly(ev.target.value)) {
      this.middleNameisnotValid = true;
    } else {
      this.middleNameisnotValid = false;
    }
  }

  public lnChange(ev:any) {
    if (!this.validatorService.isCharOnly(ev.target.value)) {
      this.lastNameisnotValid = true;
    } else {
      this.lastNameisnotValid = false;
    }
  }

  public emailChange(ev:any) {
    if (!this.validatorService.isValidEmail(ev.target.value)) {
      this.emailisnotValid = true;
    } else {
      this.emailisnotValid = false;
    }
  }
 
  public addressChange(ev:any) {
    if (!this.validatorService.isOnValidMaxLengthAddress(ev.target.value)) {
      this.addressisnotValid = true;
    } else {
      this.addressisnotValid = false;
    }
  }

  public contactChange(ev:any) {
    if (!this.validatorService.isNumOnly(ev.target.value)) {
      this.contactisnotValid = true;
    } else {
      this.contactisnotValid = false;
    }
  }

  public sexChange(ev:any) {
    if (!this.validatorService.isCharOnly(ev.target.value)) {
      this.sexisnotValid = true;
    } else {
      this.sexisnotValid = false;
    }
  }

  public bdateChange(ev:any) {
    if (!this.validatorService.isValidDate(ev.target.value)) {
      this.bdateisnotValid = true;
    } else {
      this.bdateisnotValid = false;
    }
  }

  usernameChange(ev: any){
    if (!this.validatorService.isOnValidMinLength(ev.target.value)){
      this.usernameisnotValid = true;
    }else if(!this.validatorService.isOnValidMaxLength(ev.target.value)){
      this.usernameisnotValid = true;
    } else {
      this.usernameisnotValid = false;
    }
   }
  
  passwordChange(ev: any){
    if (!this.validatorService.isOnValidMinLength(ev.target.value)){
      this.passwordisnotValid  = true;
    }else if(!this.validatorService.isOnValidMaxLength(ev.target.value)){
      this. passwordisnotValid = true;
    } 
    else if(this.validatorService.isCharNumOnly(ev.target.value)){
      this.isSpecialvalid= true;
    }
    else {
      this. passwordisnotValid = false;
      this.isSpecialvalid = false;

    }
  }

  numberOnly(ev:any): boolean {
    const charCode = (ev.which) ? ev.which : ev.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

   //#endregion
  //button function for save registration form.
  public submitRegForm(ev:any) {
    let flag = true; 
    let message = [];

    //validation Firstname
    if (!this.validatorService.isCharAndSpaceOnly(ev.target[0].value)){
      this.firstNameisnotValid = true;
      flag = false;
      message.push("Firstname is not Valid");
    } else {
      this.firstNameisnotValid = false;
      flag = true;
    }

    //validation Middlename
    if (!this.validatorService.isCharAndSpaceOnly(ev.target[1].value)){
      this.middleNameisnotValid = true;
      flag = false;
    } else {
      this.middleNameisnotValid = false;
      flag = true;
    }

    //validation Lastname
    if (!this.validatorService.isCharAndSpaceOnly(ev.target[2].value)){
      this.lastNameisnotValid = true;
      flag = false;
    } else {
      this.lastNameisnotValid = false;
      flag = true;
    } 

    // validation Email
    if (!this.validatorService.isValidEmail(ev.target[3].value)){
      this.emailisnotValid = true;
      flag = false;
    } else {
      this.emailisnotValid = false;
      flag = true;
    }
    //Validation for address
    if (!this.validatorService.isCharAndSpaceOnly(ev.target[4].value)){
      this.addressisnotValid = true;
      flag = false;
    } else {
      this.addressisnotValid = false;
      flag = true;
    }

    //Validation Contact number
    if (!this.validatorService.isNumOnly(ev.target[5].value)){
      this.contactisnotValid = true;
      flag = false;
    } else {
      this.contactisnotValid = false;
      flag = true;
    }

    //Validation sex
    if (!this.validatorService.isCharOnly(ev.target[6].value)){
      this.sexisnotValid = true;
      flag = false;
    } else {
      this.sexisnotValid = false;
      flag = true;
    }
    
    //Validation birthdate
    if (!this.validatorService.isValidDate(ev.target[7].value)){
      this.bdateisnotValid = true;
      flag = false;
    } else {
      this.bdateisnotValid = false;
      flag = true;
    }

    //Validation for username
    if (!this.validatorService.isOnValidMinLength(ev.target[9].value)){
      this.usernameisnotValid = true;
      flag = false;
    }else if(!this.validatorService.isOnValidMaxLength(ev.target[9].value)){
      this.usernameisnotValid = true;
      flag = false;
    } else {
      this.usernameisnotValid = false;
      flag = true;
    }
     //Validation for password
    if (!this.validatorService.isOnValidMinLength(ev.target[10].value)){
      this. passwordisnotValid = true;
      flag = false;
    }else if(!this.validatorService.isOnValidMaxLength(ev.target[10].value)){
      this. passwordisnotValid = true;
      flag = false;
    } else if(this.validatorService.isCharNumOnly(ev.target[10].value)){
      this.isSpecialvalid = true;
      flag = false;
    } 
    else {
      this. passwordisnotValid = false;
      this.isSpecialvalid = false;
      flag = true;
    }

    if (flag) { 
      this.loading = true;
      let formData = new FormData();
      formData.append("Avatar", this.file);
      formData.append("Firstname", ev.target[0].value);
      formData.append("Middlename", ev.target[1].value);
      formData.append("Lastname", ev.target[2].value); 
      formData.append("Email", ev.target[3].value);
      formData.append("Address", ev.target[4].value);
      formData.append("ContactNumber", ev.target[5].value);
      formData.append("Sex", ev.target[6].value);
      formData.append("Birthdate", ev.target[7].value); 
      formData.append("Username", ev.target[9].value);
      formData.append("Password", ev.target[10].value);

      this.authAPIService.createAccount(formData)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe((response:any) => {
          if(response.flag == true) {
            //success part
            Swal.fire({
              title: 'Success!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Okay'
            })
            console.log(response)
          } else {
            Swal.fire({
              title: 'Error!',
              text: response.message,
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

  hide = true;
	url: string ="../../assets/images/default-profile.png"; 
	msg = "";
	
  selectFile(e:any){
    if(!e.target.files[0] || e.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
	  var mimeType = e.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}

    if(e.target.files){
      this.file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url = event.target.result;
      }
    }
  }
}
