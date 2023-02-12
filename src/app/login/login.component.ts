import { Input, Component, OnInit } from '@angular/core';
import { AuthAPIService } from '../services/AuthAPI/auth-api.service';
import { finalize } from 'rxjs';
import { ValidatorService } from '../services/validator/validator.service';

const Swal = require('sweetalert2')

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
    usernameisnotValid = false;
    passwordisnotValid = false;
    hide = true;
    loading = false;

    //gamit ta ug ngModel
    @Input() loginData: any = {
      Username: "",
      Password: ""
    };

    constructor(
      // private location: Location, 
      private validatorService: ValidatorService,
      private authAPIService: AuthAPIService
    ) {}
  
    ngOnInit() { 
      //if e browse ni nga page auto clear token
      localStorage.removeItem("token");
    }
    
    //username validataion
    public usernameChange(ev:any) {
      if (!this.validatorService.isEmpty(ev.target.value)) {
        this.usernameisnotValid = true;
      } else {
        this.usernameisnotValid = false;
      }
    }

    //password validataion
    public passwordChange(ev:any) {
      if (!this.validatorService.isEmpty(ev.target.value)) {
        this.passwordisnotValid = true;
      } else {
        this.passwordisnotValid = false;
      }
    }

    public submitLogin(ev:any){
      let flag = true;
      let message = [];

      //validation username
      if (!this.validatorService.isEmpty(ev.target[0].value)){
        this.usernameisnotValid = true;
        flag = false;
        message.push("username is required");
      } else {
        this.usernameisnotValid = false;
        flag = true;
      }

      //validation password
      if (!this.validatorService.isEmpty(ev.target[1].value)){
        this.passwordisnotValid = true;
        flag = false;
        message.push("password is required");
      } else {
        this.passwordisnotValid = false;
        flag = true;
      }

      if (flag) { 
        this.loading =  true;
        this.authAPIService.loginAccount(this.loginData)
          .pipe(
            finalize(() => {
              this.loading = false;
            })
          ).subscribe((response:any) => { //awa ni nga line naay response, kani dri, nakasulod sya sa API, so ang response naa syay message kay ako man na gibutang didto nga naay message
            if(response.flag == true) { //dba kung true naay token ug usertype, so ako sya matawag dri, mostly ang message jd ang dle mawala
              //success part
              message.push("Successfully login");
              localStorage.setItem("token", response.token);
              window.location.reload(); // if succ login, mo reload then after reload mo init man jd to ang appcomponent
            } else {
              Swal.fire({
                title: 'Error!',
                text: response.message,
                icon: 'error',
                confirmButtonText: 'Okay'
              })
            }
          },
          (error:any) => { // dri nga line kay error, so pasabot ani dri dapita way connection sa API or unauthorized bale wala jd sya kasulod ba
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
}
