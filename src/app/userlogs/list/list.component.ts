import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportsService } from 'src/app/services/Reports/reports.service';

export interface UserLogs{
  Id : number;
  FullName : string;
  Action : string;
  DateLog : string; 
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  userLogs: any = [];
  dataSource: any;
  selection: any;
  showFiller = false;
  displayedColumns: string[] = ['Id','FullName','Action','DateLog'];
  constructor(
    public reportsService: ReportsService,
  ) { }

  ngOnInit(): void {
    this.getUserLogs();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getUserLogs(): void {
    this.reportsService.getUserLogs().subscribe((data: any) => {
      this.userLogs = data;
      this.dataSource = new MatTableDataSource<UserLogs>(this.userLogs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<UserLogs>(true, []);
    })
  }

}
