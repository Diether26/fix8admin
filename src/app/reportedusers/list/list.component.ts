import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { ReportsService } from 'src/app/services/Reports/reports.service';
import { UserManagementService } from 'src/app/services/UserManagement/user-management.service';
import Swal from 'sweetalert2';

export interface ReportedUsers{
  Id : number;
  UserID : number;
  ReportedUser : string;
  ReportedByUser : string;
  DateReported : string;
  ReportedUserAccountStatusDesc : string;
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
  reportedUsers: any = [];
  dataSource: any;
  selection: any;
  showFiller = false;
  displayedColumns: string[] = ['Id','ReportedUser','ReportedByUser','DateReported','ReportedUserAccountStatusDesc','action'];
  constructor(
    public reportsService:ReportsService ,
    public usermngtService: UserManagementService
  ) { }

  ngOnInit(): void {
    this.getReportedUsers();
  }
  
  banreportedUser(id:any){
    Swal.fire({
      title: 'Are you sure you want to ban this account?',
      showCancelButton: true,
      confirmButtonText: 'Ban Now',
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
        this.usermngtService.banUser(data)
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
            this.getReportedUsers();
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

  public getReportedUsers(): void {
    this.reportsService.getReportedUsers().subscribe((data: any) => {
      this.reportedUsers = data;
      this.dataSource = new MatTableDataSource<ReportedUsers>(this.reportedUsers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<ReportedUsers>(true, []);
    })
  }
  
}
