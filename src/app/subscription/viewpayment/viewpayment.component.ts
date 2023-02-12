import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { SubscriptionMagementService } from 'src/app/services/SubscriptionManagement/subscription-magement.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewpayment',
  templateUrl: './viewpayment.component.html',
  styleUrls: ['./viewpayment.component.scss']
})
export class ViewpaymentComponent implements OnInit{
 
  payment_info = {
    Id: "",
    PaymentMethod: "",
    Amount: "",
    ReferenceNumber: "",
    StatusDesc: "",
    DateCreated: "",
    PaymentReceipt: "",
    SubscriptionID: ""
  } 
  
  payment_url = environment.payment_url;
  Paymentreceipt: any;
  defaultPaymentReceipt : any = "../../assets/images/default-paymentreceipt.png";
  loading = false;

  constructor(
    public subscriptionMngtService : SubscriptionMagementService,
    @Inject(MAT_DIALOG_DATA) private data: any
  )
  {}

  ngOnInit(): void {
    this.getPaymentInfo();
  }

  public formatToPhp(val:any) {
    return `PHP ${parseFloat(val).toFixed(2)}`
  }

  approveSubscription(id:any){
    Swal.fire({
      title: 'Are you sure you want  to approve this subscription?',
      showCancelButton: true,
      confirmButtonText: 'Approve Now',
      showLoaderOnConfirm: true,      
      preConfirm: () => {        
        return;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          id
        }
        this.subscriptionMngtService.approveSubcription(data)
        .pipe(
          finalize(() =>{
            // not required
          })
        ).subscribe((response:any) =>{
          if(response.flag == true){     
            Swal.fire({
              title: 'Success!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Okay'
            })
            this.getPaymentInfo();
          }else{
            let messageResponse = "";
            for(let i = 0; i < response.message.length; i++) {
              messageResponse += response.message[i]+"\n";
            }
            Swal.showValidationMessage(messageResponse);
          }
        },
        (error:any) =>{
          Swal.showValidationMessage(error.message);
          console.log(error)
        });
      }
    })
  }

  rejectSubscription(id:any){
    Swal.fire({
      title: 'Are you sure you want  to reject this subscription?',
      showCancelButton: true,
      confirmButtonText: 'Reject Now',
      showLoaderOnConfirm: true,      
      preConfirm: () => {        
        return;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          id
        }
        this.subscriptionMngtService.rejectSubcription(data)
        .pipe(
          finalize(() =>{
            // not required
          })
        ).subscribe((response:any) =>{
          if(response.flag == true){            
            Swal.fire({
              title: 'Success!',
              text: response.message,
              icon: 'success',
              confirmButtonText: 'Okay'
            })            
            this.getPaymentInfo();
          }else{
            let messageResponse = "";
            for(let i = 0; i < response.message.length; i++) {
              messageResponse += response.message[i]+"\n";
            }
            Swal.showValidationMessage(messageResponse);
          }
        },
        (error:any) =>{
          Swal.showValidationMessage(error.message);
          console.log(error)
        });
      }
    })
  }

   //get payment info
   public getPaymentInfo() {
    this.subscriptionMngtService.getSubscriptionDetail(this.data.id)
    .pipe(
      finalize(() => {
        //loading part
        this.loading = false;
      })
    ).subscribe((response:any) => {
      if(response.flag == true) {
        //success part
        this.loading = true;
        this.payment_info = response.paymentDetails;
        if(!!response.paymentDetails.PaymentReceipt) {
          this.Paymentreceipt = `${this.payment_url}${response.paymentDetails.PaymentReceipt}`;
        } else {
          this.Paymentreceipt = `${this.defaultPaymentReceipt}`;
        }
      } else {
        console.log(response)
      }
    },
    (error:any) => {
      console.log(error.message)
      // if down ang api, or unauthorized ari na sya mugawas, sample
      console.log(error)
    });
  }
}
