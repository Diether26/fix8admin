import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { ContractManagementService } from 'src/app/services/ContractManagement/contract-management.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatecontractfile',
  templateUrl: './updatecontractfile.component.html',
  styleUrls: ['./updatecontractfile.component.scss']
})
export class UpdatecontractfileComponent implements OnInit{

  
  payment_url = environment.payment_url;
  contractFile: any;
  defaultPaymentReceipt : any = "../../assets/images/default-paymentreceipt.png";
  loading = false;
  msg = "";
  tanginamo = "";
  file:any;
  constructor(
      public contractMngtService : ContractManagementService,
      @Inject(MAT_DIALOG_DATA) private data: any
  ){}

  ngOnInit(): void {
    this.getContractFile();
  }

  selectFile(e:any){
    this.msg = '';
    if(!e.target.files[0] || e.target.files[0].length == 0) {
			this.msg = 'You must select an pdf file.';
			return;
		}
	  var mimeType = e.target.files[0].type;
		
		if (mimeType.match(/pdf\/*/) == null) {
			this.msg = "Only pdf are supported.";
			return;
		}

    if(e.target.files){
      this.tanginamo = e.target.files[0].name;
      this.file = e.target.files[0];
      // var reader = new FileReader();
      // reader.readAsDataURL(e.target.files[0]);
      // reader.onload=(event:any)=>{
      //   this.contractFile = event.target.result;
      // }
    }
  }

  updateContractFile(){
    this.loading = true;
    let formData = new FormData();
    console.log(this.file)
    formData.append("id", this.data.id);
    formData.append("Contract",this.file);
    this.contractMngtService.updateContractFile(formData)
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
        this.getContractFile();
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

  public getContractFile(): void {
    this.contractMngtService.getContractList().subscribe((data: any) => {
      if(!!data.ContractFile) {
        this.contractFile = `${this.payment_url}${data.ContractFile}`;
      } else {
        this.contractFile = `${this.defaultPaymentReceipt}`;
      }
    })
  }

}
