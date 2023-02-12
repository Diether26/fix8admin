import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { PaymentmanagementService } from 'src/app/services/PaymentManagement/payment-management.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viewsubscription',
  templateUrl: './viewsubscription.component.html',
  styleUrls: ['./viewsubscription.component.scss']
})
export class ViewsubscriptionComponent implements OnInit{

  subscription_url = environment.subscription_url  || environment.avatar_url;
  Paymentreceipt : any;
  defaultPaymentReceipt : any = "../../assets/images/default-paymentreceipt.png";
  subscribe_detail = {
    Id : "",
    SubscriberName : "",
    ContactNumber : "",
    Usertype : "",
    SubscribeDate : "",
    Email: "",
    PaymentMethod: ""
  }

  loading = false;
  constructor(
    public paymentMngtService : PaymentmanagementService,
    @Inject(MAT_DIALOG_DATA) private data: any
    
  ){}
  ngOnInit(): void {
    this.getSubscriptionDetail();
  }

  public getSubscriptionDetail() {
    this.paymentMngtService.getSubscriptionDetail(this.data.id)
    .pipe(
      finalize(() => {
        //loading part
        this.loading = false;
      })
    ).subscribe((response:any) => {
      if(response.flag == true) {
        //success part
        this.loading = true;
        this.subscribe_detail = response.details;
        if(!!response.details.PaymentReceipt) {
          this.Paymentreceipt = `${this.subscription_url}${response.details.PaymentReceipt}`;
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
      //if error ari pagawsa
      console.log(error)
    });
  }
}
