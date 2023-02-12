import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { InvoiceManagementServiceService } from 'src/app/services/InvoiceManagement/invoice-management-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viewpayment',
  templateUrl: './viewpayment.component.html',
  styleUrls: ['./viewpayment.component.scss']
})

export class ViewpaymentComponent implements OnInit{
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

  payment_info = {
    Id: "",
    PaymentMethod: "",
    Amount: "",
    ReferenceNumber: "",
    Status: "",
    DateCreated: "",
    PaymentReceipt: ""
  } 
  
  payment_url = environment.payment_url;
  Paymentreceipt: any;
  defaultPaymentReceipt : any = "../../assets/images/default-paymentreceipt.png";
  loading = false;

  constructor(
    public invoiceMngtService : InvoiceManagementServiceService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ){}

  ngOnInit(): void {
    this.getInvoiceDetails();  
    this.getInvoiceItem();  
    this.getPaymentInfo();  
  }

  public formatToPhp(val:any) {
    return `PHP ${parseFloat(val).toFixed(2)}`
  }

  //get invoice details
  public getInvoiceDetails() {
    this.invoiceMngtService.getInvoiceDetails(this.data.id)
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
    this.invoiceMngtService.getInvoiceItem(this.data.id)
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

  //get payment info
  public getPaymentInfo() {
    this.invoiceMngtService.getPayment(this.data.id)
    .pipe(
      finalize(() => {
        //loading part
        this.loading = false;
      })
    ).subscribe((response:any) => {
      if(response.flag == true) {
        //success part
        this.loading = true;
        this.payment_info = response.payment;
        if(!!response.payment.PaymentReceipt) {
          this.Paymentreceipt = `${this.payment_url}${response.payment.PaymentReceipt}`;
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
