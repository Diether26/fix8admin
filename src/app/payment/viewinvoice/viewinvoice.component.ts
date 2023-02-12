import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { PaymentmanagementService } from 'src/app/services/PaymentManagement/payment-management.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viewinvoice',
  templateUrl: './viewinvoice.component.html',
  styleUrls: ['./viewinvoice.component.scss']
})
export class ViewinvoiceComponent implements OnInit{
  
  payment_url = environment.payment_url;
  Paymentreceipt: any;
  defaultPaymentReceipt : any = "../../assets/images/default-paymentreceipt.png";
  loading = false;
  
  invoice_details = {
    ServiceFee: "",
    TotalCost: "",
    PaymentMethod: "",
    CreateDate: "",
    DueDate: ""
  }

  invoice_item = {
    Name: "",
    Quantity: "",
    Unit: "",
    Type: "",
    Price: ""
  }

  invoice_req_detail = {
    ServiceName : "",
    JobType : "",
    ContactNumber : "",
    Requested_To : "",
    Requested_By : "",
    PaymentMethod: ""
  }

  constructor(
    public paymentMngtService : PaymentmanagementService,
    @Inject(MAT_DIALOG_DATA) private data: any

  ){}


  ngOnInit(): void {
    this.getInvoiceDetails();  
    this.getInvoiceItem();  
    this.getInvoiceReqDetail();
  }

  public formatToPhp(val:any) {
    return `PHP ${parseFloat(val).toFixed(2)}`
  }

  //get invoice details
  public getInvoiceDetails() {
    this.paymentMngtService.getInvoiceDetails(this.data.id)
    .pipe(
      finalize(() => {
        //loading part
        this.loading = false;
      })
    ).subscribe((response:any) => {
      if(response.flag == true) {
        //success part
        this.loading = true;
        this.invoice_details = response.details;
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

  //get invoice item
  public getInvoiceItem() {
    this.paymentMngtService.getInvoiceItem(this.data.id)
    .pipe(
      finalize(() => {
        //loading part
        this.loading = false;
      })
    ).subscribe((response:any) => {
      if(response.flag == true) {
        //success part
        this.loading = true;
        this.invoice_item = response.itemData;
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

  public getInvoiceReqDetail() {
    this.paymentMngtService.getInvoiceReqDetail(this.data.id)
    .pipe(
      finalize(() => {
        //loading part
        this.loading = false;
      })
    ).subscribe((response:any) => {
      if(response.flag == true) {
        //success part
        this.loading = true;
        this.invoice_req_detail = response.details;
        if(!!response.details.PaymentReceipt) {
          this.Paymentreceipt = `${this.payment_url}${response.details.PaymentReceipt}`;
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
