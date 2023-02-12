import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContractManagementService } from 'src/app/services/ContractManagement/contract-management.service';
import { environment } from 'src/environments/environment';
import { UpdatecontractfileComponent } from '../updatecontractfile/updatecontractfile.component';

export interface ContractList{
  Id: number;
  ContractFile : string;
  ServiceName : string;
  JobType : string;
  ContactNumber : string;
  RequestedBy : string;
  DateRequested : string;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  contract_url = environment.contract_url;
  contractList: any = [];
  dataSource: any;
  selection: any;
  displayedColumns: string[] = ['Id','ContractFile','ServiceName','JobType','ContactNumber','RequestedBy','DateRequested','Action'];
  
  constructor(
    public contractMngtService: ContractManagementService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllContract();
  }

  openDialogUpdateContractFile(id:any): void{
    const dialogRef = this.dialog.open(UpdatecontractfileComponent,{
       disableClose:true,
       width:'350px',
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

  public getAllContract(): void {
    this.contractMngtService.getContractList().subscribe((data: any) => {
      this.contractList = data;
      this.dataSource = new MatTableDataSource<ContractList>(this.contractList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<ContractList>(true, []);
    })
  }
  
}
