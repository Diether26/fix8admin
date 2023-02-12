import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JoborderManagementService } from 'src/app/services/JobOrderManagement/joborder-management.service';
import { environment } from 'src/environments/environment';

export interface JobOrderList {
  id: string;
  ServiceName: string;
  JobType: string;
  Description: string;
  ContactNumber: string;
  Location: string;
  AppointmentDate: string;
  latest_activity_status: string;
  latest_activity_date: string;
  Requested_To: string;
  Requested_By: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;
 
  building_permit_url = environment.building_permit_url;
  blueprint_url = environment.blueprint_url;

  BuildingPermit : any;
  Blueprint : any;


  jobOrderList: any = [];
  dataSource: any;
  selection: any;
  showFiller = false;
  displayedColumns: string[] = ['id', 'ServiceName','JobType', 'Description', 'ContactNumber','Location','AppointmentDate','latest_activity_status','latest_activity_date','Requested_To','Requested_By'];
 
  VOForm: FormGroup | undefined;
  isEditableNew = true;

  constructor(
    public joborderMngtService: JoborderManagementService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllJoborder();
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getAllJoborder(): void {
    this.joborderMngtService.getJobOrders().subscribe((data: any) => {
      this.jobOrderList = data;
      // this.BuildingPermit = `${this.building_permit_url}${??}`;
      // this.Blueprint = `${this.blueprint_url}${???}`;

      this.dataSource = new MatTableDataSource<JobOrderList>(this.jobOrderList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<JobOrderList>(true, []);
    })
  }

}
