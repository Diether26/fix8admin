import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvoiceManagementServiceService } from 'src/app/services/InvoiceManagement/invoice-management-service.service';
import { ViewpaymentComponent } from '../viewpayment/viewpayment.component';
export interface InvoiceList {
  id: string;
  ServiceName: string;
  JobType: string;
  ContactNumber: string;
  Blueprint: string;
  AppointmentDate: string;
  Electrician: string;
  Homeowner: string;
  ServiceFee: string;
  TotalCost: string;
  PaymentMethod: string;
  CreateDate : string;
  DueDate : string;
  _Status : string;

}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  invoiceList: any = [];
  dataSource: any;
  selection: any;
  showFiller = false;
  displayedColumns: string[] = ['id', 'ServiceName','JobType','AppointmentDate','Electrician','Homeowner','ServiceFee','TotalCost','PaymentMethod','CreateDate','DueDate','_Status','Action'];
 
  VOForm: FormGroup | undefined;
  isEditableNew = true;

  constructor(
    public invoiceMngmtService: InvoiceManagementServiceService,
    public dialog: MatDialog,
  ) { }
  
  ngOnInit(): void {
    this.getAllInvoice();
  }

  openDialogViewPayment(id:any): void{
    const dialogRef = this.dialog.open(ViewpaymentComponent,{
       disableClose:true,
       width:'800px',
       data: {
         id: id
       }
    });
    //dialogRef.afterClosed().subscribe(() => this.getAllInvoice());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getAllInvoice(): void {
    this.invoiceMngmtService.getInvoice().subscribe((data: any) => {
      this.invoiceList = data;
      this.dataSource = new MatTableDataSource<InvoiceList>(this.invoiceList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<InvoiceList>(true, []);
    })
  }

}
