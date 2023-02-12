import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { FeedbackManagementService } from 'src/app/services/FeedBackManagement/feedback-management.service';
import Swal from 'sweetalert2';

export interface FeedbackList{
  Id: number;
  Rate: number;
  Comment: string;
  Date: Date;
  RateDesc: string;
  FeedbackTo: string;
  FeedbackBy: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  oneStarRate = new Array(1);
  twoStarRate = new Array(2);
  threeStarRate = new Array(3);
  fourStarRate = new Array(4);
  fiveStarRate = new Array(5);

  feedbackList: any = [];
  dataSource: any;
  selection: any;
  displayedColumns: string[] = ['Id','Rate','RateDesc','Comment','Date','FeedbackTo','FeedbackBy','Action'];

  constructor(
    public feedbackMngtService : FeedbackManagementService
  ){}
  ngOnInit(): void {
    this.getAllFeedback();
  }

  deleteFeedback(id:any){
    Swal.fire({
      title: 'Are you sure you want  to delete this feedback?',
      showCancelButton: true,
      confirmButtonText: 'Delete Now',
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
        this.feedbackMngtService.deleteFeedback(data)
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
            this.getAllFeedback();
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

  public getAllFeedback(): void {
    this.feedbackMngtService.getFeedbackList().subscribe((data: any) => {
      this.feedbackList = data;
      this.dataSource = new MatTableDataSource<FeedbackList>(this.feedbackList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<FeedbackList>(true, []);
    })
  }

}
