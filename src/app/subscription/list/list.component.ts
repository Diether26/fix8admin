import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { SubscriptionMagementService } from 'src/app/services/SubscriptionManagement/subscription-magement.service';
import Swal from 'sweetalert2';
import { ViewpaymentComponent } from '../viewpayment/viewpayment.component';

export interface SubscriptionList{
  id:number;
  SubscriptionName: string;
  SubscribeDate: Date;
  Status: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  VOForm: FormGroup | undefined;
  isEditableNew = true;

  subscriptionList: any = [];
  dataSource: any;
  selection: any;
  showFiller = false;
  displayedColumns: string[] = ['id', 'SubscriptionName','SubscribeDate','Action'];
 
  constructor(
    public subscriptionMngntService: SubscriptionMagementService,
    public dialog: MatDialog,
  ) {  }
  
  ngOnInit(): void {
    this.getAllSubscription();
  }
  
  openDialogViewPayment(id:any): void{
    const dialogRef = this.dialog.open(ViewpaymentComponent,{
       disableClose:true,
       width:'800px',
       data: {
         id: id
       }
    });
    dialogRef.afterClosed().subscribe(() => this.getAllSubscription());
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
        this.subscriptionMngntService.approveSubcription(data)
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
            this.getAllSubscription();
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
        this.subscriptionMngntService.rejectSubcription(data)
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
            this.getAllSubscription();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getAllSubscription(): void {
    this.subscriptionMngntService.getSubscription().subscribe((data: any) => {
      this.subscriptionList = data;
      this.dataSource = new MatTableDataSource<SubscriptionList>(this.subscriptionList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<SubscriptionList>(true, []);
    })
  }

}
