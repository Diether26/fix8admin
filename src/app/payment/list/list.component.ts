import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentmanagementService } from 'src/app/services/PaymentManagement/payment-management.service';
import { environment } from 'src/environments/environment';
import { ViewinvoiceComponent } from '../viewinvoice/viewinvoice.component';
import { ViewsubscriptionComponent } from '../viewsubscription/viewsubscription.component';

export interface PaymentList{
  Id: number;
  PaymentMethod: string;
  Amount: string;
  ReferenceNumber: string;
  Status: string;
  DateCreated: string;  
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent  implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
  
  paymentList: any = [];
  dataSource: any;
  selection: any;
  showFiller = false;
  displayedColumns: string[] = ['Id','PaymentFor','PaymentMethod','Amount','ReferenceNumber','DateCreated','Status','Action'];

  constructor(
    public paymentMngmtService: PaymentmanagementService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllPayment();
  }

  openDialogViewInvoice(id:any): void{
    const dialogRef = this.dialog.open(ViewinvoiceComponent,{
       disableClose:true,
       width:'800px',
       data: {
         id: id
       }
    });
  }

  openDialogViewSubscription(id:any): void{
    const dialogRef = this.dialog.open(ViewsubscriptionComponent,{
       disableClose:true,
       width:'800px',
       data: {
         id: id
       }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getAllPayment(): void {
    this.paymentMngmtService.getPayment().subscribe((data: any) => {
      this.paymentList = data;
      this.dataSource = new MatTableDataSource<PaymentList>(this.paymentList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<PaymentList>(true, []);
    })
  }

}
