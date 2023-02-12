import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AccountService } from '../../../services/Account/account.service';
import { AuthAPIService } from '../../../services/AuthAPI/auth-api.service';
import { DataReloadService } from '../../../services/DataReload/data-reload.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changeavatar',
  templateUrl: './changeavatar.component.html',
  styleUrls: ['./changeavatar.component.scss']
})
export class ChangeavatarComponent implements OnInit{
  avatar_url = environment.avatar_url;
  currentAvatar: any;  
  file:any;
  msg = "";
  loading = false;
  constructor(
    private accountService : AccountService,
    private authAPIService: AuthAPIService,
    private dataReload: DataReloadService
  ){}
  ngOnInit(): void {
    this.getCurrentUser();
  }
  

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
        this.currentAvatar = `${this.avatar_url}${response.userData.Avatar}`;
        this.dataReload.avatar(this.currentAvatar);
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
        this.currentAvatar = event.target.result;
      }
    }
  }

  submitAvatar(){
    this.loading = true;
    let formData = new FormData();
    formData.append("Avatar",this.file);
    this.accountService.updateAvatar(formData)
    .pipe(
      finalize(() => {
        this.loading = false;
         //loading part
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
        this.getCurrentUser();
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
      console.log(error.message)
      // if down ang api, or unauthorized ari na sya mugawas, sample
      //if error ari pagawsa
      console.log(error)
    });
  }

}
